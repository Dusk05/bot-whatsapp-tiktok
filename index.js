const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(), // <--- AQUÍ FALTABA EL 'new'
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

client.on('qr', (qr) => {
    console.log('Escanea este código QR con tu WhatsApp:');
    qrcode.generate(qr, { small: false });
});

client.on('ready', async () => {
    console.log('¡El bot de WhatsApp está conectado y listo!');

    // Aquí obtendremos el ID de tus grupos
    const chats = await client.getChats();
    chats.forEach(chat => {
        if (chat.isGroup) {
            console.log(`Grupo: ${chat.name} ---> ID: ${chat.id._serialized}`);
        }
    });
});

client.initialize();
