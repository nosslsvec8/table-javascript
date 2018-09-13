// $(document).ready(function() {

// });


function action(action){
    if(action === 'deleteColumn'){
        field.deleteColumn();
    }
    else if(action === 'addColumn'){
        field.addColumn();
    }
    else if(action === 'addRow'){
        field.addRow();
    }
    else{
        field.deleteRow();
    }
}


class Field{
    constructor(initialColumn, initialRow){
        this._column = initialColumn;
        this._row = initialRow;
        this._updateWidth = 0;
        this._positioAddColumn = 0;
        this.updateField();
    }

    addElement(){
        let Div = document.createElement('div');
        Div.className = "field__field-square";
        let is = document.getElementsByClassName("field__field-view-panel")[0];
        is.appendChild(Div);
    }

    addColumn(){
        this._column++;
        for (let i = 0; i < this._row; i++) {
            this.addElement();
        }
        this.updateField();
    }

    addRow(){
        this._row++;
        this.updateField();
    }

    deleteColumn(){
        this._column--;
        for (let i = 0; i < this._row * 2; i++) {
            document.getElementsByClassName("field__field-view-panel")[0].lastChild.remove();
        }
        this.updateField();
    }

    deleteRow(){
        this._row--;
        this.updateField();
    }

    updateField(){
        this._updateWidth = sizeSquare * this._column + this._column * 3;
        this._positioAddColumn = sizeSquare * this._column + this._column * 3 + 2;
        document.getElementsByClassName('field__field-view-panel')[0].style.width = this._updateWidth + "px";
        document.getElementsByClassName('field__field-square_control-add-row')[0].style.marginLeft = this._positioAddColumn + "px";
    }
}


let sizeSquare = document.getElementsByClassName('field__field-square')[0].offsetWidth;
// console.log(sizeSquare);
const Column = 4;
const Row = 4;
const field = new Field(Column, Row);
