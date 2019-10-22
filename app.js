const  prompt = require ('prompt-sync')();
const watson = require('watson-developer-cloud/assistant/v1'); // watson sdk
require('dotenv').config()
const ASSISTANT_IAM_URL = '';
const ASSISTANT_IAM_APIKEY = '';
 
const chatbot = new watson({
    'version': '2019-10-22',
    'url': ASSISTANT_IAM_URL || 'https://gateway.watsonplatform.net/assistant/api',
    'iam_apikey': ASSISTANT_IAM_APIKEY || 'BG374X7pEaAC1i292DOxq_F1y4J3VgjR1AaaHc4zahPf',
    'iam_url': 'https://iam.bluemix.net/identity/token'
  });
 
    const workspace_id = '68ea0bb3-0cf4-4a0a-86f9-c6080fef62b5';
    
  
 
  //Começando a conversação com a mensagem vazia;
  chatbot.message({workspace_id}, trataResposta);

let fimDeConversa=false;


function trataResposta(err, resposta){
 
    if(err){
        console.log(err);
        return;
    }

    if (resposta.intents.length>0){
        console.log('Eu detectei a intenção' + resposta.intents[0]);
    if(resposta.intents[0].intents=='despedida'){
        fimDeConversa==true;
    }
    }

    // exibe a resposta do dialogo,caso exista
    if(resposta.output.text.length > 0){
        console.log(resposta.output.text[0]);
    }

 //console.log(resporta.context)
if(!fimDeConversa){
const mensagemUsuario = prompt('>>');
    chatbot.message({
        workspace_id,    
        input: {text: mensagemUsuario},
        context:resposta.context
    },trataResposta);
}  
}
