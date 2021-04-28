import { useState } from "react";
import {
  Button,
  Card,
  Container,
  List,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Item from "./Item";
import CustomAppBar from "./CustomAppBar";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#F5FAFA",
  },
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  textInput: {
    marginRight: 15,
    marginBottom: 15,
  },
  numberInput: {
    width: 80,
    marginRight: 15,
    marginBottom: 15,
  },
  form: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  card: {
    padding: 15,
    margin: 15,
  },
});

function App() {
  const classes = useStyles();

  const [shoppingList, setShoppingList] = useState([
    { title: "bananas", quantity: 2 },
    { title: "cherries", quantity: 3 },
  ]);

  const [currentItem, setCurrentItem] = useState("");
  const [currentNumber, setCurrentNumber] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(undefined); 

  const addItem = (e) => {
    e.preventDefault();
    if (currentIndex == undefined) {
      console.log("ajout")
      if (currentItem.trim() && currentNumber > 0) 
    {
      setShoppingList([ ... shoppingList,{

        title: currentItem, quantity: currentNumber
      }
      ])
      setCurrentItem("")
      setCurrentNumber(0)
      }else{alert("il faut remplir tous les champs ")}
    }else{
      if (currentItem.trim() && currentNumber > 0){   
        console.log("modification")
        let newList = [...shoppingList];
        newList[currentIndex] = {title: currentItem, quantity: currentNumber}
        setShoppingList(newList)
        setCurrentItem("")
        setCurrentNumber(0)  
      }else{alert("il faut remplir tous les champs ")}

    }
    
    // done
  };

  const removeItem = (index) => {
    console.log(index)  ;
    shoppingList.splice(index-1, 1);
    setShoppingList(shoppingList);
    setCurrentItem(" "); // pour mettre à jour l'interface 
    
  };

  const onTextChanged = (e) => {
    setCurrentItem(e.target.value)
    // Fixed ! 
  };

  const onNumberChanged = (e) => {
    setCurrentNumber(e.target.value)
    // Fixed ! 
  };
  

  const updateItem = (index) => {
      console.log(index);
      setCurrentIndex(index);
      setCurrentItem(shoppingList[index].title);
      setCurrentNumber(shoppingList[index].quantity)
  }

  return (
    <div className={classes.root}>
      <CustomAppBar />
      <div className={classes.container}>
        <Container maxWidth="sm">
          <Card className={classes.card}>
            <form onSubmit={addItem}>
              <div className={classes.form}>
                <div>
                  <TextField
                    className={classes.textInput}
                    label="Item"
                    value={currentItem}
                    onChange={onTextChanged}
                  />
                </div>
                <div>
                  <TextField
                    type="number"
                    className={classes.numberInput}
                    label="Quantity"
                    value={currentNumber}
                    onChange={onNumberChanged}
                  />
                </div>
                <div>
                  <Button type="submit" variant="contained" color="primary">
                    Add
                  </Button>
                </div>
              </div>
            </form>
          </Card>
          <Card className={classes.card}>
            <List>
              {shoppingList.map((item, key) => {
                return (
                  <Item item={item} key={key} index={key} editCallback={updateItem} removeCallback={removeItem}  />
                );
              })}
            </List>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default App;
