import { element } from 'utils/dom.js';
import { ObservableBool } from 'utils/observable.js';
import { collections } from 'state/collection.js';
import { ItemEditForm } from 'components/dash/item-edit-form.js';


export function Item(item) {
    
    const showModal = new ObservableBool(false);

    const deleteItem = () => {
        collections.items.delete(item._id);
    }

    const openEditModal = () => {
        showModal.true();
    }

    return (
        element('div', {className: 'panel item'},
            ItemEditForm(item, showModal),
            element('div', {className: 'left'}),
            element('div', {className: 'center'},
                element('div', {
                    className: 'title', 
                    textContent: item.title,
                    onclick: openEditModal
                }),
                element('div', {className: 'details'}),
            ),
            element('div', {className: 'right'},
                element('span', {
                    className: 'delete',
                    textContent: '×',
                    onclick: deleteItem
                })
            )
        )
    )
}
