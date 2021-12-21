document.addEventListener('DOMContentLoaded', () => {
    let menuItems = Array.from(document.querySelectorAll('.menu_item a')),
          pageUrl = window.location.href;

    for (let i = 0; i < menuItems.length; i++) {
        if (pageUrl.includes(pages[i])) {
            menuItems[i].style.color = '#EAE6CA';
        }
    }

    
});

const pages = [
    'index',
    'library',
    'account'
];