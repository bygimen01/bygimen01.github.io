let pageUrls = {
    about: '/index.html?about',
    contact:'/index.html?contact'
};
function OnStartUp(params) {
    popStateHandler();
}
OnStartUp();
document.querySelector('#about-link').addEventListener('click', (event) => {
let stateObj = {
    page: 'about'
};
document.title = 'About';
history.pushState(stateObj, "about", "?about");
RenderAboutPage();
});
document.querySelector('#contact-link').addEventListener('click', (event) => {
let stateObj = {
    page: 'contact'
};
document.title = 'Contact';
history.pushState(stateObj, "contact", "?contact");
RenderContactPage();
});
function RenderAboutPage(params) {
    document.querySelector('main').innerHTML = `<h1 class="title">About Me</h1>
<p> Lorem Ipsum is simply dummy text of the p
rinting and typesetting industry. Lorem
Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
printer took a galley of type and scrambled it to make a type specimen book. It has survived
not only five centuries, but also t
he leap into electronic typesetting, remaining essentially
unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
PageMaker including ver
sions of Lorem Ipsum.</p>`;
}
function RenderContactPage(params) {
    document.querySelector('main').innerHTML = `<h1 class="title">Contact with me</h1>
<p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
printer took a galley of type and scrambled it to make a type specimen book. It has survived
not only five centuries, but also the leap into electronic typesetting, re
maining essentially
unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
PageMaker including versions of Lorem Ipsum.</p>`;
}
function popStateHandler(event) {
    loc = window.location.href.toString().split(window.location.host)[1];
    if (loc === pageUrls.contact){
        RenderContactPage();
    }
    if(loc === pageUrls.about){
        RenderAboutPage();
    }
}
window.onpopstate = popStateHandler;