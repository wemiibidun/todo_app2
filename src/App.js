import React from 'react';
import './App.css';
import ListItems from './ListItems';
import {library } from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';


library.add(faTrash);

//creating class component
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      items:[],
      currentItem:{
        text: '',
        key: ''
      }
    }
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this); 
  }

  //define methods
  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }
    addItem(e){
      e.preventDefault(); //prevent button from refreshing on every click
      const newItem = this.state.currentItem;
      if (newItem.text !==''){
        const newItems = [...this.state.items, newItem];
        this.setState({
          items: newItems,
          currentItem:{
            text:'',
            key: ''
          }
        })
      }
    }

    deleteItem(key){
      const filteredItems = this.state.items.filter(item => item.key !== key); //filter unmatched items
      this.setState({
        items: filteredItems 
      })
    }

    setUpdate(text, key){
      const items = this.state.items;
      items.map(item => {
        if(item.key === key){
          item.text = text; //check if the item is equal to the key function and change to text value
        }
      })
      this.setState({
        items: items
      })
    }

  render(){
    return(
      <div className = 'App'>
        <header>
        <form id = 'todo_form' onSubmit = {this.addItem}>
          <input type='text' placeholder = 'Enter List Items here' value = {this.state.currentItem.text} onChange = {this.handleInput}
          
          />
          
          <button type = 'submit'>Add</button>

        </form>
      </header>

      <ListItems 
      items = {this.state.items}  
      deleteItem = {this.deleteItem}
      setUpdate = {this.setUpdate}
      />

      </div>
    );
  }
}

export default App;
