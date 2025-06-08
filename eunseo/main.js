'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    if(window.scrollY >= navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
	const target = event.target;
	const link = target.dataset.link;

	if (link == null) {
		return;
	}
    navbarMenu.classList.remove('open');
	scrollIntoView(link);
});

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    home.style.opacity = 1 - (window.scrollY / homeHeight);
});

// Show arrow-up btn when scrolling 
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
});

arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});


// Modal

for (let i = 1; i <= 9; i++) {
    const openBtn = document.querySelector(`.openModalBtn${i}`);
    const closeBtn = document.querySelector(`.closeModalBtn${i}`);
    const modal = document.querySelector(`.work__modal${i}`);

    openBtn.addEventListener("click", () => {
        console.log(`open group project ${i}`);
        modal.classList.remove("modal__hidden");
    });

    closeBtn.addEventListener("click", () => {
        console.log(`close group project ${i}`);
        modal.classList.add("modal__hidden");
    });
};

document.addEventListener("DOMContentLoaded", () => {
  const openModalBtn6 = document.querySelector('.openModalBtn6');
const workModal6 = document.querySelector('.work__modal6');
const closeModalBtn6 = document.querySelector('.closeModalBtn6');

if (openModalBtn6 && workModal6 && closeModalBtn6) {
  openModalBtn6.addEventListener('click', () => {
    workModal6.classList.remove('modal__hidden');
  });

  closeModalBtn6.addEventListener('click', () => {
    workModal6.classList.add('modal__hidden');
  });
}

  closeModalBtn6.addEventListener('click', () => {
    workModal6.classList.add('modal__hidden');
  });

});






// Responsive navbar header
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');

navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});

// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다.
const sectionIds = [
    '#home',
    '#about',
    '#myWork',
    '#contact', 
];

const sections = sectionIds.map(id => document.querySelector(id));
const navItmes = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

console.log(sections);
console.log(navItmes);

// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
let selectedNavIndex = 0;
let selectedNavItem = navItmes[0];
function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
    selectNavItem(navItmes[sectionIds.indexOf(selector)]);
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
}

const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            
            // 스크롤링이 아래로 되어서 페이지가 올라옴
            if (entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex = index - 1;
            }
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
    // 제일 위에 있다면
    if (window.scrollY === 0) {
        selectedNavIndex = 0;
    } 
    // 제일 밑에 있다면
    else if (Math.ceil(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
        selectedNavIndex = navItmes.length - 1;
    }
    selectNavItem(navItmes[selectedNavIndex]);
});