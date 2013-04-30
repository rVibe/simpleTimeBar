#SimpleTimeBar 
is a programmatic, event-driven implementation of a "timebar", licensed under the GNU Public License (GPL) version 3. Similar to a progress-bar, but with time as the input. Think indicating to the user that enough time has passed. 
#Demo:
[Demo](http://htmlpreview.github.io/?https://github.com/rVibe/simpleTimeBar/blob/master/example.html)
##Requirements:

1. jQuery is a requirement, and must be included prior to instantiation of any SimpleTimeBar objects.

##Intended use:

1. Initially developed to function alongside Twitter Bootstrap, which provides an excellent 'progress-bar' component. 

##Events:
all events also have a corresponding 'before' and 'after' action, e.g. 'beforeStart' or 'afterStop'

1. start
called when .start() is called on a SimpleTimeBar
2. update
called during each update to the SimpleTimeBar's internal time
3. stop
called upon the SimpleTimeBar's internal time matching the end time that it was initialized with, but can also be called manually to indicate that a particular SimpleTimeBar has been interrupted by some other action
4. complete
 called if the SimpleTimeBar ran until completion

5. failure
 called if .stop() was called sometime before completion

##License:
GPL v3, as stated in the repository file LICENSE
