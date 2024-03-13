import { element } from 'utils/dom.js';
import { DashList } from 'components/dash/dash-list.js';
import { DashFooter } from 'components/dash/dash-footer.js';
import { DashHeader } from 'components/dash/dash-header.js';
import { ObservableVar } from 'utils/observable.js';


export function Dash() {

    // all/none/domainId-any/items/tasks/events/domains
    const selection = new ObservableVar('all-items');   

    return (
        element('div', {className: 'dash'},
            DashHeader(),
            DashList(selection),
            DashFooter(selection)
        )
    )
}
