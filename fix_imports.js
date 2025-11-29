const fs = require('fs');
const path = require('path');

const dir = 'packages/ui/src/dashboard';
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.endsWith('.tsx')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace ./ui/ with ../
        content = content.replace(/from '\.\/ui\//g, "from '../");
        content = content.replace(/from '@\/components\/ui\//g, "from '../");

        fs.writeFileSync(filePath, content);
        console.log(`Fixed ${file}`);
    }
});
