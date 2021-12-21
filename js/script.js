const games = Array.from(document.querySelectorAll('.shop_item')),
      container = document.querySelector('.container'),
      modal = document.querySelector('.modal');
      

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < games.length; i++) {
        games[i].addEventListener('click', () => {
            container.style.opacity = '.6';
            container.style.pointerEvents = 'none';
            modal.style.display = 'flex';
            modal.innerHTML = `
                <a href="#" class="close"></a>
                <div class="shop_item">
                    ${games[i].innerHTML}
                </div>
                <div class="modal_btn">Buy</div>
            `;

            const modal_btn = document.querySelector('.modal_btn'),
                  close_modal = document.querySelector('.close');

            // logic buy
            modal_btn.addEventListener('click', () => {
                let gameName = games[i].childNodes[3].innerHTML,
                    gameSrc = games[i].childNodes[1].src;
                if (!localStorage.games) {
                    localStorage.games = `${gameName}, `;
                    localStorage.srcs = `${gameSrc}, `;
                    closeModal();
                } else if (!localStorage.games.includes(gameName)) {
                    localStorage.games += `${gameName}, `;
                    localStorage.srcs += `${gameSrc}, `;
                    closeModal();
                } else {
                    alert('You have already bought this game');
                    closeModal();
                }
            });
            // ---------
            close_modal.addEventListener('click', () => {
                closeModal();
            });

            function closeModal() {
                modal.style.display = 'none';
                container.style.opacity = '1';
                container.style.pointerEvents = 'auto';
            }
        });
    }
});