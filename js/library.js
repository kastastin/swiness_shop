document.addEventListener('DOMContentLoaded', () => {
    
    if (localStorage.hasOwnProperty('nameReg')) {
        document.querySelector('.form').style.display = 'none';
        showMetamask();
        
    } else {
        newReg();
    }

    function newReg() {
        $('.message a').click(function(){
            $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
        });
    
    
        const registerBtn = document.querySelector('.register_btn'),
              nameReg = document.querySelector('.name_reg'),
              passReg = document.querySelector('.pass_reg'),
              form = document.querySelector('.form');
    
        registerBtn.addEventListener('click', () => {
            localStorage.setItem('nameReg', nameReg.value);
            localStorage.setItem('passReg', passReg.value);
            form.style.display = 'none';
    
            showMetamask();
        });
    }


    function showMetamask() {
        const button = document.querySelector('.metamask'),
              accountID = document.querySelector('.tab_name h2'),
              libraryBlock = document.querySelector('.library_block');

        button.style.display = 'block';


        button.addEventListener('click', () => {
            getAccount();
            displayChoose();
        });
    
        async function getAccount() {
            const accounts = await ethereum.request({method:'eth_requestAccounts'}),
                  account = accounts[0];
    
            accountID.innerHTML = `Account: ${account}`;  
            button.style.display = 'none';
        } 
    
        function displayChoose() {
            libraryBlock.innerHTML = `
            <div class="choose_dev hide_choose">
                <div class="choose_btn choose_hover dev">
                    Developer
                </div>
            </div>
            <div class="choose_gamer hide_choose">
                <div class="choose_btn choose_hover gamer">
                    Gamer
                </div>
            </div>
            `;
    
            libraryBlock.style.justifyContent = 'space-around';
    
            const chooseDev = document.querySelector('.dev'),
                  chooseGamer = document.querySelector('.gamer');
    
            // Developer events
    
            chooseDev.addEventListener('click', () => {
                let text = accountID.textContent;
                
                if (!text.includes('(dev)')) {
                    accountID.innerHTML = [text.slice(0, 7), ' (dev)', text.slice(7)].join('');
                }
    
                const hideChooses = Array.from(document.querySelectorAll('.hide_choose'));
    
                for (let i = 0; i < hideChooses.length; i++) {
                    hideChooses[i].style.display = 'none';
                    libraryBlock.innerHTML = `
                        <div class="plus"></div>
                    `;
                }
            });

            chooseGamer.addEventListener('click', () => {
                let text = accountID.textContent;
                
                if (!text.includes('(gamer)')) {
                    accountID.innerHTML = [text.slice(0, 7), ' (gamer)', text.slice(7)].join('');
                }
    
                const hideChooses = Array.from(document.querySelectorAll('.hide_choose'));
    
                for (let i = 0; i < hideChooses.length; i++) {
                    hideChooses[i].style.display = 'none';

                    if (!localStorage.games) {
                        libraryBlock.innerHTML = '<div class="no_games">You have no purchased games</div>';
                        const noGames = document.querySelector('.no_games')
                        noGames.style.display = 'flex';
                    } else {
                        const purchasedGames = localStorage.games.split(', '),
                              purchasedSrcs = localStorage.srcs.split(', ');
                        let htmlData = '';

                        for (let i = 0; i < purchasedGames.length - 1; i++) {
                            htmlData += `
                                <div class="shop_item">
                                    <img src="${purchasedSrcs[i]}">
                                    <p class="game_name">${purchasedGames[i]}</p>
                                </div>
                            `;
                        }

                        libraryBlock.innerHTML = htmlData;
                        libraryBlock.style.padding = '40px 112px 0 112px';
                        libraryBlock.style.flexWrap = 'wrap';
                        libraryBlock.style.justifyContent = 'start';
                        libraryBlock.style.pointerEvents = 'none';
                    }
                }
            });
        }
    }
});