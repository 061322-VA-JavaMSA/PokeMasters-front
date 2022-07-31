import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private modals: any[] = [];
    private last: any = null;

    add(modal: any) {
        // add modal to array of active modals
        this.modals.push(modal);
    }

    remove(id: string) {
        // remove modal from array of active modals
        this.modals = this.modals.filter(x => x.id !== id);
    }

    open(id: string) {
        // open modal specified by id
        if (this.last) {
            this.last.close();
        }
        const modal = this.modals.find(x => x.id === id);
        this.last = modal;
        modal.open();
    }

    close() {
        // close modal specified by id
        this.last.close();
    }
}