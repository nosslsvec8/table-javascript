
function action(action, number){
    if(action === 'mouseScroll'){
        field.shiftColomn(number);
        field.shiftRow(number);
    }
    else if(action === 'deleteColumn'){
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
        this._sizeSquare = sizeSquare;
        this.updateField();
    }

    shiftColomn(number){
        for( number; number >= this._column; number = number - this._column){}
        document.getElementsByClassName("field__field-square_control-delete-column")[0].style.marginLeft = number * this._sizeSquare + number * 3 + "px";
    }

    shiftRow(number){
        number++;
        number = Math.ceil( number / this._row );
        number--;
        document.getElementsByClassName("field__field-square_control-delete-row")[0].style.marginTop = number * this._sizeSquare + number * 3 + 3 + "px";
    }

    addElement(){
        let Div = document.createElement('div');
        Div.className = "field__field-square";
        let is = document.getElementsByClassName("field__field-view-panel")[0];
        is.appendChild(Div);
    }

    deleteElement(){
        document.getElementsByClassName("field__field-view-panel")[0].lastChild.remove();
    }

    addColumn(){
        this._column++;
        for (let i = 0; i < this._row; i++) {
            this.addElement();
        }
        if(this._column == 2){
            document.getElementsByClassName('field__field-square_control-delete-column')[0].style.display="flex";
        }
        this.updateField();
    }

    addRow(){
        this._row++;
        for (let i = 0; i < this._column; i++) {
            this.addElement();
        }
        if(this._row == 2){
            document.getElementsByClassName('field__field-square_control-delete-row')[0].style.display="flex";
        }
        this.updateField();
    }

    deleteColumn(){
        if(this._column > 4){
            for (let i = 0; i < this._row; i++) {
                this.deleteElement();
            }
        }
        else{
            for (let i = 0; i < this._row * 2; i++) {
                this.deleteElement();
            }
        }
        this._column--;
        if(this._column == 1){
            document.getElementsByClassName('field__field-square_control-delete-column')[0].style.display="none";
        }
        this.updateField();
    }

    deleteRow(){
        if(this._row > 4){
            for (let i = 0; i < this._column; i++) {
                this.deleteElement();
            }
        }
        else{
            for (let i = 0; i < this._column * 2; i++) {
                this.deleteElement();
            }
        }
        this._row--;
        if(this._row == 1){
            document.getElementsByClassName('field__field-square_control-delete-row')[0].style.display="none";
        }
        this.updateField();
    }

    updateField(){
        this._updateWidth = sizeSquare * this._column + this._column * 3;
        this._positionAddColumn = sizeSquare * this._column + this._column * 3 + 2;
        this._positionAddRow = sizeSquare * this._row + this._row * 2 + 5;
        document.getElementsByClassName('field__field-view-panel')[0].style.width = this._updateWidth + "px";
        document.getElementsByClassName('field__field-square_control-add-column')[0].style.marginLeft = this._positionAddColumn + "px";
        document.getElementsByClassName('field__field-square_control-add-row')[0].style.marginTop = this._positionAddRow + "px";
    }
}


let sizeSquare = document.getElementsByClassName('field__field-square')[0].offsetWidth;
const Column = 4;
const Row = 4;
const field = new Field(Column, Row, sizeSquare);


document.body.onmouseover = document.body.onmouseout = handler;
let parent = document.getElementsByClassName("field__field-view-panel")[0];


function handler(event) {
    if (event.type == 'mouseover') {
        let e = event;
        let target = e.target || e.srcElement;
        for(let i in parent.children) {
            if(parent.children[i] == target){
                action('mouseScroll', i);
            }
        }
    }
}