import { element } from 'utils/dom.js';
import { UserInfoDisplay } from 'components/common/user-info-display.js';
import { LogoutButton } from 'components/common/logout-button.js'
import { SignupForm } from 'components/common/signup-form.js';
import { LoginForm } from 'components/common/login-form.js';
import { CreateTaskForm } from 'components/common/create-task-form.js';
import { CreateDomainForm } from 'components/common/create-domain-form.js';
import { CreateEventForm } from 'components/common/create-event-form.js';
import { DomainList } from 'components/common/domain-list.js';
import { TaskList } from 'components/pages/debug/task-list.js';
import { EventList } from 'components/common/event-list.js';

export function Debug() {
    return (
        element('div', {className: 'dashboard'},
            element('h1', {textContent: 'Debug Dash!'}),
            UserInfoDisplay(),
            SignupForm(),
            LoginForm(),
            LogoutButton(),

            CreateDomainForm(),
            CreateTaskForm(),
            CreateEventForm(),
            
            DomainList(),
            TaskList(),
            EventList()
        )
    )
}
