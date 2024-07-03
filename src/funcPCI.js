
async function funcPCI(estado) {
    while (true) {
        const  data  = await fetch(`https://api-pci.vercel.app/estado/${estado}`);
        const dataJson = await data.json();
       
        return dataJson
    }
}
    
// Código de exemplo para testar a função follow
if (require.main === module) {
    (async () => {
        const result = await funcPCI('ms');
        console.log(result);
    })();
}
