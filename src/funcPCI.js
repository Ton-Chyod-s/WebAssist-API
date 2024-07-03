
async function funcPCI(estado) {
    while (true) {
        const  data  = await fetch(`https://api-pci.vercel.app/estado/${estado}`);
        let dataJson;

        if (data.status === 200) {
            dataJson = await data.json();
        } else {
            dataJson = { error: 'Api fora do ar' };
        }
        
        return dataJson
    }
}

module.exports = { funcPCI };

// Código de exemplo para testar a função follow
if (require.main === module) {
    (async () => {
        const result = await funcPCI('ms');
        console.log(result);
    })();
}
