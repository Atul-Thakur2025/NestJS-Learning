export class invalidStatusException extends Error{
    constructor(){
        super("Invalid status update. Status can only be updated in the order of OPEN -> IN_PROGRESS -> DONE");
        this.name = 'invalidStatusException';
    }
}