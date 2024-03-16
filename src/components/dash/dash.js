import { element } from 'utils/dom.js';
import { DashList } from 'components/dash/dash-list.js';
import { DashFooter } from 'components/dash/dash-footer.js';
import { DashHeader } from 'components/dash/dash-header.js';
import { ObservableVar } from 'utils/observable.js';


export function Dash() {

    /*
        domain          type
        ------          ------
        all             any
        none            items
        domainId        tasks
                        events
                        domains
    */

    const selection = new ObservableVar('all-tasks');   

    return (
        element('div', {className: 'dash'},
            DashHeader(),
            DashList(selection),
            DashFooter(selection)
        )
    )
}
