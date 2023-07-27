import { element } from 'utils/dom.js';
import { Loader } from 'components/app-mvp/loader.js';
import { UserInfoDisplay } from 'components/app-mvp/user-info-display.js';
import { LogoutButton } from 'components/app-mvp/logout-button.js'
import { SignupForm } from 'components/app-mvp/signup-form.js';
import { LoginForm } from 'components/app-mvp/login-form.js';
import { InviteForm } from 'components/app-mvp/invite-form.js';
import { CreateTaskForm } from 'components/app-mvp/create-task-form.js';
import { CreateDomainForm } from 'components/app-mvp/create-domain-form.js';
import { CreateEventForm } from 'components/app-mvp/create-event-form.js';
import { DomainList } from 'components/app-mvp/domain-list.js';
import { TaskList } from 'components/app-mvp/task-list.js';
import { EventList } from 'components/app-mvp/event-list.js';

export function Dash() {
    return (
        element('div', {className: 'dashboard'},
            element('h1', {textContent: 'Dash!'}),
            Loader(), 
            UserInfoDisplay(),
            SignupForm(),
            LoginForm(),
            InviteForm(),
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
