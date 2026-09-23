const fs=require('node:fs');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
const manifest=JSON.parse(fs.readFileSync('extension/manifest.json','utf8'));
if(manifest.key||manifest.update_url||manifest.externally_connectable) throw new Error('Legacy extension identity must not be shipped');
for(const file of fs.readdirSync('extension').filter(name=>name.endsWith('.js'))) {
 const result=spawnSync(process.execPath,['--check',path.join('extension',file)],{encoding:'utf8'});
 if(result.status!==0) {process.stderr.write(result.stderr);process.exit(1);}
}
console.log('Extension JavaScript syntax and standalone manifest validated.');
