const $template = document.createElement('template');
$template.innerHTML = `
<style>
.user-card {
  font-family: 'Arial', sans-serif;
  background: #f4f4f4;
  width: 500px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
  margin-bottom: 15px;
  border-bottom: darkorchid 5px solid;
}
.user-card img{
  width: 100%;
}
.info li p, .user-card button{
  cursor: pointer;
  background: darkblue;
  color: #fff;
  border: 0;
  border-radius: 5px;
  padding: 5px 10px;
}
</style>
<div class="user-card">
  <img />
  <div>
    <h3></h3>
    <ul class=info>
      <li><p><slot name="email"></p></li>
      <li><p><slot name="phone"></p></li>
    </ul>
    <button id=toggle-info>Hide Info</button>
  </div>
</div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;

    // mode open so you can see css in debugger
    this.attachShadow({mode: 'open' });
    this.shadowRoot.appendChild($template.content.cloneNode(true));
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
    const info = this.shadowRoot.querySelector(".info");
    const toggleBtn = this.shadowRoot.querySelector("#toggle-info");
    if (this.showInfo) {
      info.style.display = 'block';
      toggleBtn.innerText = 'Hide Info';
    } else {
      info.style.display = 'none';
      toggleBtn.innerText = 'Show Info';
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => {this.toggleInfo()});
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').removeEventListener();
  }

}


/*
function UserCard() {};
UserCard.prototype = Object.create(HTMLElement.prototype, { 
  createdCallback: function() {
      this.attachShadow({mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
  }
});
*/
// In firefox, go to about:config and set preference dom.webcomponents.enabled to true 
// But still line below did not work; works in Chrome
window.customElements.define('user-card', UserCard);

// document.registerElement returns a constructor <-- deprecated
//UserCard = document.registerElement('user-card', {prototype: UserCard.prototype});

// IN CONSOLE, you can interactively do
//
