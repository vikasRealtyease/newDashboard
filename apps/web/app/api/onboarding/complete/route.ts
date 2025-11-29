import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@realtyeaseai/database';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            userId,
            companyName,
            industry,
            selectedPlan,
            selectedServices
        } = body;

        // Validate required fields
        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

        // Update user profile with company info
        await prisma.userProfile.update({
            where: { userId },
            data: {
                // Store company/industry in JSON metadata for now
                // You can add dedicated fields to the schema later
            },
        });

        // If a plan was selected, create a subscription
        if (selectedPlan) {
            const plan = await prisma.subscriptionPlan.findUnique({
                where: { slug: selectedPlan },
            });

            if (plan) {
                const trialDays = 14;
                const trialEndsAt = new Date();
                trialEndsAt.setDate(trialEndsAt.getDate() + trialDays);

                const currentPeriodEnd = new Date();
                currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);

                await prisma.subscription.create({
                    data: {
                        userId,
                        planId: plan.id,
                        status: 'TRIALING',
                        trialEndsAt,
                        currentPeriodEnd,
                    },
                });

                // Add trial credits to wallet
                if (plan.includedAICredits > 0) {
                    const wallet = await prisma.aICreditsWallet.findUnique({
                        where: { userId },
                    });

                    if (wallet) {
                        const newBalance = wallet.balance + plan.includedAICredits;
                        await prisma.aICreditsWallet.update({
                            where: { userId },
                            data: {
                                balance: newBalance,
                                lifetimeAdded: wallet.lifetimeAdded + plan.includedAICredits,
                            },
                        });

                        // Record the transaction
                        await prisma.creditTransaction.create({
                            data: {
                                walletId: wallet.id,
                                amount: plan.includedAICredits,
                                balanceAfter: newBalance,
                                type: 'SUBSCRIPTION',
                                description: `Trial credits from ${plan.name} plan`,
                            },
                        });
                    }
                }
            }
        }

        // Create notification for successful onboarding
        await prisma.notification.create({
            data: {
                userId,
                type: 'SYSTEM_ALERT',
                title: 'Welcome to RealtyEaseAI!',
                message: `Your account has been set up successfully. ${selectedPlan ? 'Your trial period has started.' : 'Choose a plan to get started with AI-powered services.'}`,
                isRead: false,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Onboarding completed successfully',
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Onboarding completion error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}
