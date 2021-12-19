document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.metamask'),
          accountID = document.querySelector('.tab_name h2'),
          libraryBlock = document.querySelector('.library_block');


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
    }

    

    
});