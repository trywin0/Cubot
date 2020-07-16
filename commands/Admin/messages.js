const Discord = require("discord.js");
const Color = require("color")
const moment = require("moment")
const { functions } = require("../../functions");
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
module.exports = {
        name: "messages",
        description: "Fetch messages from a discord channel and then get a html file of them",
        usage: "messages <amount>",
        accessibleto: 1,
        run: async(client, message, args) => {
                try {
                    if (!args[0] || isNaN(args[0])) return message.channel.send(argsEmbed("messages <amount>"))
                    let amount = args[0]
                    let loop = Math.ceil(amount / 100)
                    let latest = message.channel.lastMessageID
                    let messages = []
                    for (var i = 0; i < loop; i++) {
                        let num = amount / loop
                        console.log(Math.round(num))
                        let fetched = await message.channel.messages.fetch({ limit: Math.round(num), before: latest })
                        latest = fetched.lastKey().id
                        fetched.filter(m => m.content != "").forEach(m => messages.push({ user: m.author.tag, pfp: m.author.displayAvatarURL({ format: "png" }), message: m.content, color: m.member.roles.highest.color != 0 ? m.member.roles.highest.hexColor : "#ffffff" }))

                    }
                    const fs = require('fs');
                    console.log(messages.length)
                    let htmlstring = `<html>

            <head>
                <link rel="stylesheet" type="text/css" href="style.css">
                <title>Cubot messages</title>
            </head>
            
            <body onresize='resized()'>
            <body onload="bottom()">
            <script>
                function bottom() {
                    document.getElementById('messagearea').scrollTop = document.getElementById('messagearea').scrollHeight - document.getElementById('messagearea').clientHeight
                }
            </script>
    
                <div id='window'>
            
                    <div id='windowmsgarea'>
                        <div id='header'><svg id='icon0' width="24" height="24" viewBox="0 0 24 24" class="icon-22AiRD da-icon"><path fill="#72767d" fill-rule="evenodd" clip-rule="evenodd" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"></path></svg>
                            <h3 id='title'>${message.channel.name}</h3>
                        </div>
                        <div id='messagearea'>
                            <div id='fmsgs'>
                       ${messages.reverse().map(m=>(messages.reverse()[messages.reverse().indexOf(m)-1]?messages.reverse()[messages.reverse().indexOf(m)-1].user:undefined) != m.user?`         <div class="messagebox"><img class="pfp hgrab" src="${m.pfp}">
                       <div class="pfpspace"></div>
                       <h3 class="hunderline name hgrab" style="color: ${m.color}">${m.user}</h3>
                       <div class="message">${m.message}</div>
                   </div>`:`<div class="thinmsgbox"><div class="mesthin">${m.message}</div></div>`).join("\n")}
            
                            </div>
                            <div id='gap'></div>
                        </div>
                        <div class='messagebar readonly'>
                            <svg width="24" height="24" viewBox="0 0 24 24" id="icon1" class='icon'><path fill="#b9bbbe" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>
                            <div id='textinput' contenteditable='true'></div><svg id='icon2' class='icon' width="24" height="24" class="icon-3D60ES da-icon" aria-hidden="false" viewBox="0 0 24 24"><path fill="#b9bbbe" fill-rule="evenodd" clip-rule="evenodd" d="M16.886 7.999H20C21.104 7.999 22 8.896 22 9.999V11.999H2V9.999C2 8.896 2.897 7.999 4 7.999H7.114C6.663 7.764 6.236 7.477 5.879 7.121C4.709 5.951 4.709 4.048 5.879 2.879C7.012 1.746 8.986 1.746 10.121 2.877C11.758 4.514 11.979 7.595 11.998 7.941C11.9991 7.9525 11.9966 7.96279 11.9941 7.97304C11.992 7.98151 11.99 7.98995 11.99 7.999H12.01C12.01 7.98986 12.0079 7.98134 12.0058 7.97287C12.0034 7.96282 12.0009 7.95286 12.002 7.942C12.022 7.596 12.242 4.515 13.879 2.878C15.014 1.745 16.986 1.746 18.121 2.877C19.29 4.049 19.29 5.952 18.121 7.121C17.764 7.477 17.337 7.764 16.886 7.999ZM7.293 5.707C6.903 5.316 6.903 4.682 7.293 4.292C7.481 4.103 7.732 4 8 4C8.268 4 8.519 4.103 8.707 4.292C9.297 4.882 9.641 5.94 9.825 6.822C8.945 6.639 7.879 6.293 7.293 5.707ZM14.174 6.824C14.359 5.941 14.702 4.883 15.293 4.293C15.481 4.103 15.732 4 16 4C16.268 4 16.519 4.103 16.706 4.291C17.096 4.682 17.097 5.316 16.707 5.707C16.116 6.298 15.057 6.642 14.174 6.824ZM3 13.999V19.999C3 21.102 3.897 21.999 5 21.999H11V13.999H3ZM13 13.999V21.999H19C20.104 21.999 21 21.102 21 19.999V13.999H13Z"></path></svg>
                            <svg id='icon3' class='icon' width="24" height="24" class="icon-3D60ES da-icon" aria-hidden="false" viewBox="0 0 24 24">
                                <path fill="#b9bbbe" d="M2 2C0.895431 2 0 2.89543 0 4V20C0 21.1046 0.89543 22 2 22H22C23.1046 22 24 21.1046 24 20V4C24 2.89543 23.1046 2 22 2H2ZM9.76445 11.448V15.48C8.90045 16.044 7.88045 16.356 6.74045 16.356C4.11245 16.356 2.66045 14.628 2.66045 12.072C2.66045 9.504 4.23245 7.764 6.78845 7.764C7.80845 7.764 8.66045 8.004 9.32045 8.376L9.04445 10.164C8.42045 9.768 7.68845 9.456 6.83645 9.456C5.40845 9.456 4.71245 10.512 4.71245 12.06C4.71245 13.62 5.43245 14.712 6.86045 14.712C7.31645 14.712 7.64045 14.616 7.97645 14.448V12.972H6.42845V11.448H9.76445ZM11.5481 7.92H13.6001V16.2H11.5481V7.92ZM20.4724 7.92V9.636H17.5564V11.328H19.8604V13.044H17.5564V16.2H15.5164V7.92H20.4724Z"></path>
                                </svg>
                            <div id='emojimsgbar'><img src='https://discordapp.com/assets/626aaed496ac12bbdb68a86b46871a1f.svg' id='emoji'></div>
                        </div>
                    </div>
                </div>
                <script>
                    var inputbox = document.getElementById('textinput')
                    var messagearea = document.getElementById('messagearea')
                    var fmsgs = document.getElementById('fmsgs')
                    var messagebar = document.getElementById('messagebar')
                    var messages = []

                    function getcontent(e) {
                        for (var i = 0; i < messages.length; i++) {
                            if (messages[i][0] == e) {
                                return messages[i]
                            }
                        }
                    }
      
            
            
                    function addmessage(pfp, name, message, id, channel, author, msgid) {
                        var opac = ''
                        if (author == true) opac = ' opc'
                        var msg = \`<div class='messagebox'><img class='pfp hgrab' src='\${pfp}'><div class='pfpspace'></div><h3 class='hunderline name hgrab'>\${name}</h3><div id='\${msgid}' class='message\${opac}'>\${message}</div></div>\`;
                        //  msg = \`<div class='thinmsgbox'><div id='\${msgid}' class='mesthin\${opac}'>\${message}</div></div>\`
                        fmsgs.innerHTML += msg
                        for (var i = 0; i < messages.length; i++) {
                            if (messages[i][0] == channel) {
                                messages[i][1] += msg;
                                messages[i][3] = id;
                            }
                        }
                    }
            
                    function resize(x) {
                        setTimeout(function() {
                            messagearea.style.height = \`calc(100% - \${116+(messagebar.offsetHeight - 44)}px)\`;
                            if (x == true) {
                                messagearea.scrollTo(0, messagearea.scrollHeight);
                            }
                        }, 50)
            
                    }
            
                    function resized() {
                        resize(messagearea.scrollTop + messagearea.clientHeight >= messagearea.scrollHeight - 5)
                    }
            
                    inputbox.addEventListener('keydown', (evt) => {
                        var scrollbottom = messagearea.scrollTop + messagearea.clientHeight >= messagearea.scrollHeight - 5;
                        if (evt.which === 13) {
                            evt.preventDefault();
                            if (inputbox.innerText.replace(new RegExp(' ', 'g'), '') == '') return
                            var messageid = \`\${Math.floor(Math.random()*10000000)}\`;
                            addmessage(pfpp, namee, inputbox.innerText, uniqueid, false, messageid);
                            inputbox.innerHTML = '';
                        }
                        resize(scrollbottom)
                    });
                </script>
                <style>
                  
        body {
            font-family: Arial;
            position: absolute;
            height: 100%;
            width: 100%;
            margin: 0;
            background-color: #202225;
        }
        
         ::-webkit-input-placeholder {
            color: #72767d;
        }
        
        #window {
            height: 100%;
            width: 100%;
            background-color: #36393f;
            position: relative;
        }
        
        #windowmsgarea {
            position: absolute;
            height: 100%;
            top: 0px;
            width: 100%;
            display: inline-block;
            background-color: #36393f;
            right: 0;
            transition: width 0.5s ease;
        }
       .readonly > #icon1 {
       display: none;
}
       .readonly > #textinput {
       display: none;
}
       .readonly > #icon2 {
       display: none;
}
       .readonly > #icon3 {
       display: none;
}
       .readonly > #emojimsgbar {
       display: none;
}
.readonly::before {
    content: 'Cubot messages';
    padding-left: 16px;
    color: #4E5158;
    position: absolute;
    top: 12.7px;
}

        #leftbit {
            position: relative;
            height: 100%;
            width: 240px;
            display: inline-block;
            background-color: #2f3136;
        }
        
        #userinfo {
            position: absolute;
            bottom: 0px;
            width: 100%;
            height: 52px;
            background-color: #292b2f;
        }
        
        .messagebar {
            height: auto;
            min-height: 44px;
            width: calc(100% - 32px);
            position: absolute;
            left: 16px;
            bottom: 24px;
            background-color: #40444b;
            border-radius: 8px;
            overflow: hidden;
        }
.readonly {
    background-color: #3B3F45;
}
        
        #icon1 {
            padding-left: 16px;
            padding-right: 16px;
            padding-top: 10px;
            float: left;
        }
        
        #icon2 {
            padding: 10px 8px 10px 8px;
            float: left;
        }
        
        #icon3 {
            padding: 10px 8px 10px 8px;
            float: left;
        }
        
        #emojimsgbar {
            height: 44px;
            width: 38px;
            float: left;
        }
        
        #emojimsgbar:hover>#emoji {
            filter: grayscale(0%);
            transform: scale(1.14);
        }
        
        #emoji {
            width: 22px;
            height: 22px;
            margin-top: 11px;
            margin-bottom: 11px;
            margin-left: 8px;
            margin-right: 8px;
            filter: grayscale(100%);
            transition: transform 0.1s ease;
        }
        
        #textinput {
            height: auto;
            width: calc(100% - 192px);
            float: left;
            padding: 0 10px 0 0;
            border: none;
            outline: none;
            position: relative;
            word-break: break-word;
            padding-top: 12.8px;
            padding-bottom: 12.8px;
            background: transparent;
            color: #dcddde;
        }
        
        #header {
            height: 48px;
            width: 100%;
            border-bottom: 1px solid;
            border-color: #18191c;
        }
        
        #gap {
            width: 100%;
            height: 24px;
            display: block;
        }
        
        #fmsgs {
            height: auto;
        }
        
        #icon0 {
            float: left;
            position: relative;
            padding-left: 8px;
            padding-right: 8px;
            margin-left: 8px;
            padding-top: 12px;
            padding-bottom: 12px;
        }
        
        #title {
            float: left;
            font-size: 16px;
            position: relative;
            color: #fff;
            margin-top: 14px;
        }
        
        #messagearea {
            width: 100%;
            height: calc(100% - 116px);
            overflow-x: hidden;
            overflow-y: scroll;
        }
        
        #messagearea::-webkit-scrollbar {
            display: none;
        }
        
        .icon:hover path {
            fill: #fff;
            cursor: pointer;
        }
        
        .messagebox {
            width: 100%;
            height: auto;
            position: relative;
            padding-left: 20px;
            padding-top: 6px;
            padding-bottom: 3px;
            margin-top: 17px;
        }
        
        .thinmsgbox {
            width: 100%;
            height: auto;
            position: relative;
            padding: 3px 0 3px 0;
        }
        
        .thinmsgbox:hover {
            background-color: rgba(4, 4, 5, 0.07);
        }
        
        .mesthin {
            height: auto;
            width: calc(100% - 120px);
            margin-left: 82px;
            color: #dcddde;
        }
        
        .mention {
            background-color: rgba(250, 166, 26, 0.05);
            box-shadow: 3px 0px 0px rgba(250, 166, 26, 1) inset;
        }
        
        .messagebox:hover {
            background-color: rgba(4, 4, 5, 0.07);
        }
        
        .mention:hover {
            background-color: rgba(250, 166, 26, 0.1);
        }
        
        .pfp {
            height: 40px;
            width: 40px;
            position: absolute;
            border-radius: 50%;
        }
        
        .pfpspace {
            height: 40px;
            width: 40px;
            margin-right: 0px;
            display: inline-block;
        }
        
        .name {
            position: absolute;
            margin: 0;
            top: 5px;
            left: 82px;
            font-size: 16px;
        }
        
        .message {
            display: inline-block;
            position: relative;
            left: 22px;
            margin: 0;
            height: auto;
            width: calc(100% - 120px);
            margin-top: 25px;
            overflow-wrap: break-word;
            color: #dcddde;
        }
        
        .channeliconhashtag {
            margin-top: 4px;
            padding-right: 6px;
            display: inline-block;
        }
        
        .channelname {
            position: absolute;
            color: #8E9297;
            font-size: 16px;
            margin: 0;
            display: inline-block;
            top: 6.9px;
        }
        
        .hgrab:hover {
            cursor: pointer;
        }
        
        .hunderline:hover {
            text-decoration: underline;
        }
        
        .channel:hover {
            background-color: rgba(79, 84, 92, 0.16);
            cursor: pointer;
        }
        
        .opc {
            opacity: 0.5;
        }
        
        [class='channel']:hover>.channelname {
            color: rgba(255, 255, 255, 0.9);
        }
        
        @media (max-width: 650px) {
            #windowmsgarea {
                width: 100%;
            }
        }
        
        @media (max-width: 300px) {
            #windowmsgarea {
                width: 100%;
            }
        }
    
                </style>
            </body>
            
            </html>`
            fs.writeFileSync("messages.txt", messages.reverse().join("\n"));
            fs.writeFileSync("log.html", htmlstring);
            message.channel.send("Success! The log.html is for previewing and the messages.txt for simplicity",{ files: ["./log.html","./messages.txt"] })
        } catch (e) {
            console.log(e);
            message.channel.send(errorEmbed(e))
        }
    }
}