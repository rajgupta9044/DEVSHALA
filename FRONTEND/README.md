# HOOKS
Think of Hooks as special React functions.

# COMPONENTS
function SignUp(){}
React components are functions.

function Demo(){
    let name="Raj";
}

If later
name="Aman";

React DOES NOT know anything changed.
So it doesn't update the screen.

# USESTATE

const [name, setName] = useState('');
name = ""
setName = function

WHENEVER STATE CHANGES IT RERENDER THE COMPONENT WITHOUT USEFFECT CHANGES ARE NOT RERENDER IN WEBPAGE 

# e
e stands for
Event Object
React automatically passes it.
Suppose user clicks submit.

e.preventDefault()
stops browser's default behaviour.

Submit
↓
No Reload
↓
React Handles Everything

# justify-center

This aligns items on the Main Axis.
The Main Axis depends on the flex-direction.
If direction is column :flex-col
Main Axis becomes (vertical)

With
justify-center
------------------------

|

|

Hello

|

|

------------------------

Now it's vertically centered.

# item -center

items-center
This aligns items on the Cross Axis.

flex-col
Cross Axis is
Horizontal