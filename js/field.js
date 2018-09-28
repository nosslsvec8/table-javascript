
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
    constructor(initialColumn, initialRow, sizeSquare){
        this._column = initialColumn;
        this._row = initialRow;
        this._sizeSquare = sizeSquare;
        this._columnFocus = 0;
        this._rowFocus = 0;
        this.updateField();
    }

    shiftColomn(number){
        number = number % this._column;
        document.getElementsByClassName("field__field-square_control-delete-column")[0].style.marginLeft = number * this._sizeSquare + number * 3 + "px";
        this._columnFocus = number;
    }

    shiftRow(number){
        number = Math.ceil( (Number(1) + Number(number) ) / this._column ) - 1;
        document.getElementsByClassName("field__field-square_control-delete-row")[0].style.marginTop = number * this._sizeSquare + number * 3 + 3 + "px";
        this._rowFocus = number;
    }

    addLastElement(){
        let Div = document.createElement('div');
        Div.className = "field__field-square";
        let is = document.getElementsByClassName("field__field-view-panel")[0];
        is.appendChild(Div);
    }

    addColumn(){
        this._column++;
        let panel = document.getElementsByClassName("field__field-view-panel")[0];
        for (let i = 0; i < this._row; i++) {
            panel.children[ this._column + this._column * i - 2 ].insertAdjacentHTML("afterEnd", "<div class='field__field-square'></div>");
        }
        if(this._column == 2){
            document.getElementsByClassName('field__field-square_control-delete-column')[0].style.display="flex";
        }
        this.updateField();
    }

    addRow(){
        this._row++;
        for (let i = 0; i < this._column; i++) {
            this.addLastElement();
        }
        if(this._row == 2){
            document.getElementsByClassName('field__field-square_control-delete-row')[0].style.display="flex";
        }
        this.updateField();
    }

    deleteColumn(){
        for (let i = this._row - 1; i >= 0; i--) {
            document.getElementsByClassName("field__field-view-panel")[0].children[ Number(i * this._column) + Number(this._columnFocus) ].remove();
        }
        if( this._column == Number(this._columnFocus + 1) ){
            this._columnFocus--;
            this.shiftColomn(this._columnFocus);
        }
        this._column--;
        if(this._column == 1){
            document.getElementsByClassName('field__field-square_control-delete-column')[0].style.display="none";
        }
        this.updateField();
    }

    deleteRow(){
        for (let i = this._column - 1; i >= 0; i--) {
            document.getElementsByClassName("field__field-view-panel")[0].children[ Number(this._rowFocus * this._column) + Number(i) ].remove();
        }
        if( this._row == Number(this._rowFocus + 1) ){
            this._rowFocus--;
            this.shiftRow(this._rowFocus * this._column);
        }
        this._row--;
        if(this._row == 1){
            document.getElementsByClassName('field__field-square_control-delete-row')[0].style.display="none";
        }
        this.updateField();
    }

    updateField(){
        this._updateWidth = sizeSquare * this._column + this._column * 3;
        this._positionAddColumn = sizeSquare * this._column + this._column * 3 + 4;
        this._positionAddRow = sizeSquare * this._row + this._row * 2 + 8;
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

function handler(event) {
    if (event.type == 'mouseover') {
        let target = event.target || event.srcElement;
        addEventListener( target, getIndex(target) );
    }
}

function getIndex(target) {
    for(let i in document.getElementsByClassName("field__field-view-panel")[0].children) {
        if(document.getElementsByClassName("field__field-view-panel")[0].children[i] == target){
            return action('mouseScroll', i);
        }
    }
}