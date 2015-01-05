# Real2Time - Editor
## Version
Alpha-0.0.1

##Pre-Requisites
- install docker [https://docs.docker.com/installation/](https://docs.docker.com/installation/)
- install fig [http://www.fig.sh/install.html](http://www.fig.sh/install.html)

##Usage
Clone repo to download `fig.yml` file and get the last version:

    $ git clone https://github.com/real2time/real-2-time-editor.git

Create and start containers:

    $ fig up

Stop containers:

    $ fig stop

Restart containers:

    $ fig restart

Add more supervisors:

    $ fig scale supervisor=3

##FAQ
### How can I access Real2Time - Editor UI from my host?
Take a look at fig.yml:

    ui:
        image: real2time/real-2-time-editor:alpha-0.0.1
        ports:
            - "48080:8080"
            - "48081:8081"

This tells Docker to expose the Docker UI container's port 8080 as port 49080 on the host<br/>

If you are running docker natively you can use localhost. If you're using boot2docker, then do:

    $ boot2docker ip
    The VM's Host only interface IP address is: 192.168.59.103

Which returns your docker VM's IP.<br/>
So, to open storm UI, type the following in your browser:

    localhost:49080

or

    192.168.59.103:49080

in my case.

## Supported Docker versions
This image is officially supported on Docker version 1.4.1.

Support for older versions (down to 1.0) is provided on a best-effort basis.

## User feedback
If you have any problems with or questions about this image, please contact us through a GitHub issue.

You can also reach many of the official image maintainers via the #docker-library IRC channel on Freenode.
### Issues
### Contributing

You are invited to contribute new features, fixes, or updates, large or small; we are always thrilled to receive pull requests, and do our best to process them as fast as we can.

Before you start to code, we recommend discussing your plans through a GitHub issue, especially for more ambitious contributions. This gives other contributors a chance to point you in the right direction, give you feedback on your design, and help you find out if someone else is working on the same thing.

## License
[GPLv3]

[GPLv3]:http://www.gnu.org/copyleft/gpl.html#content
