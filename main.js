const input = document.querySelector('input');
const addBtn = document.querySelector('.btn-add');
const ul = document.querySelector('ul');
const empty = document.querySelector('.empty');
let i = 0;
class Store {
  static getToDos() {
    let toDos;
    if (localStorage.getItem('toDos') === null){
        toDos = [];
    } else {
        toDos = JSON.parse(localStorage.getItem('toDos'));
    }
    return toDos;
  }

  static addToDo(toDo) {
    const toDos = Store.getToDos();
    toDos.push(toDo);
    localStorage.setItem('toDos', JSON.stringify(toDos));
  }
  
  static removeToDo(id) {
    const toDos = Store.getToDos();
    toDos.splice(id, 1);
    localStorage.setItem('toDos', JSON.stringify(toDos));
  }
}

class Interface {
  static displayToDos() {
    const toDos = Store.getToDos();
    toDos.forEach((toDo) => Interface.addToDoToList(toDo));
  }

  static addToDoToList(toDo) {
    const text = toDo;
    if(text !== '') {
      const li = document.createElement('li');
      const p = document.createElement('p');
      p.textContent = text;
      li.id = i;
      li.appendChild(p);
      li.appendChild(addDeleteBtn());
      ul.appendChild(li);
      
      empty.style.display = 'none';
      i++;
    }
  }
}



addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  Interface.addToDoToList(input.value);
  Store.addToDo(input.value);
  input.value = '';
  
  
});

function addDeleteBtn() {
  const deleteBtn = document.createElement('button');

  deleteBtn.textContent = 'X';
  deleteBtn.className = 'btn-delete';

  deleteBtn.addEventListener('click', (e) => {
    const item = e.target.parentElement;
    console.log(console.log(e.target.parentElement));

    const items = document.querySelectorAll('li');

    if (items.length === 0) {
        empty.style.display = 'block';
    }
    Store.removeToDo(item.id);
    
  });
  
  return deleteBtn;
  
}

document.addEventListener('DOMContentLoaded', Interface.displayToDos);