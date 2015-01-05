



<!DOCTYPE html>
<html lang="en" class="">
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# object: http://ogp.me/ns/object# article: http://ogp.me/ns/article# profile: http://ogp.me/ns/profile#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Language" content="en">
    
    
    <title>jquery-idleTimeout/README.md at master · JillElaine/jquery-idleTimeout</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub">
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub">
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png">
    <meta property="fb:app_id" content="1401488693436528">

      <meta content="@github" name="twitter:site" /><meta content="summary" name="twitter:card" /><meta content="JillElaine/jquery-idleTimeout" name="twitter:title" /><meta content="jquery-idleTimeout - Idle activity timeout and logout redirect for jQuery for multiple windows &amp;amp; tabs" name="twitter:description" /><meta content="https://avatars0.githubusercontent.com/u/1692562?v=3&amp;s=400" name="twitter:image:src" />
<meta content="GitHub" property="og:site_name" /><meta content="object" property="og:type" /><meta content="https://avatars0.githubusercontent.com/u/1692562?v=3&amp;s=400" property="og:image" /><meta content="JillElaine/jquery-idleTimeout" property="og:title" /><meta content="https://github.com/JillElaine/jquery-idleTimeout" property="og:url" /><meta content="jquery-idleTimeout - Idle activity timeout and logout redirect for jQuery for multiple windows &amp; tabs" property="og:description" />

      <meta name="browser-stats-url" content="/_stats">
    <link rel="assets" href="https://assets-cdn.github.com/">
    <link rel="conduit-xhr" href="https://ghconduit.com:25035">
    <link rel="xhr-socket" href="/_sockets">
    <meta name="pjax-timeout" content="1000">
    <link rel="sudo-modal" href="/sessions/sudo_modal">

    <meta name="msapplication-TileImage" content="/windows-tile.png">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="selected-link" value="repo_source" data-pjax-transient>
      <meta name="google-analytics" content="UA-3769691-2">

    <meta content="collector.githubapp.com" name="octolytics-host" /><meta content="collector-cdn.github.com" name="octolytics-script-host" /><meta content="github" name="octolytics-app-id" /><meta content="5F782532:67D2:289789EB:5470D421" name="octolytics-dimension-request_id" /><meta content="7532198" name="octolytics-actor-id" /><meta content="jmsantorum" name="octolytics-actor-login" /><meta content="4c51a183cd431aaff7aa1bb04cc33537a814a267238964bd81c94da136f00838" name="octolytics-actor-hash" />
    
    <meta content="Rails, view, blob#show" name="analytics-event" />

    
    
    <link rel="icon" type="image/x-icon" href="https://assets-cdn.github.com/favicon.ico">


    <meta content="authenticity_token" name="csrf-param" />
<meta content="C8kKyqmgQDBJV9dieU1a9+dUAT7gCtPczSy0gr13bx4lIv+lTvzqYfGDB38Td5s7QJ5fATA/xINgGBiVW8GztQ==" name="csrf-token" />

    <link href="https://assets-cdn.github.com/assets/github-fa9b8c5d848205db514d4097d2b78f4528d01a79f39601e0f9c5c40ed6894711.css" media="all" rel="stylesheet" type="text/css" />
    <link href="https://assets-cdn.github.com/assets/github2-e48cf9f7b34f2138837ae8f236223b114441dde478e265f64e1ad9bf6bd76afd.css" media="all" rel="stylesheet" type="text/css" />
    
    


    <meta http-equiv="x-pjax-version" content="a3ac1570158331332f4e32c9da80623c">

      
  <meta name="description" content="jquery-idleTimeout - Idle activity timeout and logout redirect for jQuery for multiple windows &amp; tabs">
  <meta name="go-import" content="github.com/JillElaine/jquery-idleTimeout git https://github.com/JillElaine/jquery-idleTimeout.git">

  <meta content="1692562" name="octolytics-dimension-user_id" /><meta content="JillElaine" name="octolytics-dimension-user_login" /><meta content="11844949" name="octolytics-dimension-repository_id" /><meta content="JillElaine/jquery-idleTimeout" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="true" name="octolytics-dimension-repository_is_fork" /><meta content="8778472" name="octolytics-dimension-repository_parent_id" /><meta content="josebalius/jquery-idleTimeout" name="octolytics-dimension-repository_parent_nwo" /><meta content="4284634" name="octolytics-dimension-repository_network_root_id" /><meta content="philpalmieri/jquery-idleTimeout" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/JillElaine/jquery-idleTimeout/commits/master.atom" rel="alternate" title="Recent Commits to jquery-idleTimeout:master" type="application/atom+xml">

  </head>


  <body class="logged_in  env-production linux vis-public fork page-blob">
    <a href="#start-of-content" tabindex="1" class="accessibility-aid js-skip-to-content">Skip to content</a>
    <div class="wrapper">
      
      
      
      


      <div class="header header-logged-in true" role="banner">
  <div class="container clearfix">

    <a class="header-logo-invertocat" href="https://github.com/" data-hotkey="g d" aria-label="Homepage" ga-data-click="Header, go to dashboard, icon:logo">
  <span class="mega-octicon octicon-mark-github"></span>
</a>


      <div class="site-search repo-scope js-site-search" role="search">
          <form accept-charset="UTF-8" action="/JillElaine/jquery-idleTimeout/search" class="js-site-search-form" data-global-search-url="/search" data-repo-search-url="/JillElaine/jquery-idleTimeout/search" method="get"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div>
  <input type="text"
    class="js-site-search-field is-clearable"
    data-hotkey="s"
    name="q"
    placeholder="Search"
    data-global-scope-placeholder="Search GitHub"
    data-repo-scope-placeholder="Search"
    tabindex="1"
    autocapitalize="off">
  <div class="scope-badge">This repository</div>
</form>
      </div>
      <ul class="header-nav left" role="navigation">
        <li class="header-nav-item explore">
          <a class="header-nav-link" href="/explore" data-ga-click="Header, go to explore, text:explore">Explore</a>
        </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="https://gist.github.com" data-ga-click="Header, go to gist, text:gist">Gist</a>
          </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="/blog" data-ga-click="Header, go to blog, text:blog">Blog</a>
          </li>
        <li class="header-nav-item">
          <a class="header-nav-link" href="https://help.github.com" data-ga-click="Header, go to help, text:help">Help</a>
        </li>
      </ul>

    
<ul class="header-nav user-nav right" id="user-links">
  <li class="header-nav-item dropdown js-menu-container">
    <a class="header-nav-link name" href="/jmsantorum" data-ga-click="Header, go to profile, text:username">
      <img alt="jmsantorum" class="avatar" data-user="7532198" height="20" src="https://avatars3.githubusercontent.com/u/7532198?v=3&amp;s=40" width="20" />
      <span class="css-truncate">
        <span class="css-truncate-target">jmsantorum</span>
      </span>
    </a>
  </li>

  <li class="header-nav-item dropdown js-menu-container">
    <a class="header-nav-link js-menu-target tooltipped tooltipped-s" href="#" aria-label="Create new..." data-ga-click="Header, create new, icon:add">
      <span class="octicon octicon-plus"></span>
      <span class="dropdown-caret"></span>
    </a>

    <div class="dropdown-menu-content js-menu-content">
      
<ul class="dropdown-menu">
  <li>
    <a href="/new"><span class="octicon octicon-repo"></span> New repository</a>
  </li>
  <li>
    <a href="/organizations/new"><span class="octicon octicon-organization"></span> New organization</a>
  </li>


    <li class="dropdown-divider"></li>
    <li class="dropdown-header">
      <span title="JillElaine/jquery-idleTimeout">This repository</span>
    </li>
      <li>
        <a href="/JillElaine/jquery-idleTimeout/issues/new"><span class="octicon octicon-issue-opened"></span> New issue</a>
      </li>
</ul>

    </div>
  </li>

  <li class="header-nav-item">
        <a href="/notifications" aria-label="You have no unread notifications" class="header-nav-link notification-indicator tooltipped tooltipped-s" data-ga-click="Header, go to notifications, icon:read" data-hotkey="g n">
        <span class="mail-status all-read"></span>
        <span class="octicon octicon-inbox"></span>
</a>
  </li>

  <li class="header-nav-item">
    <a class="header-nav-link tooltipped tooltipped-s" href="/settings/profile" id="account_settings" aria-label="Settings" data-ga-click="Header, go to settings, icon:settings">
      <span class="octicon octicon-gear"></span>
    </a>
  </li>

  <li class="header-nav-item">
    <form accept-charset="UTF-8" action="/logout" class="logout-form" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="pjWTpvG8cenlFnDM2G1vyV1IfkH5tvUmbt6xSKpRCyeiNFes7H648xTY/lth/FeIQaxo/52g9PdlczcAPaBpMA==" /></div>
      <button class="header-nav-link sign-out-button tooltipped tooltipped-s" aria-label="Sign out" data-ga-click="Header, sign out, icon:logout">
        <span class="octicon octicon-sign-out"></span>
      </button>
</form>  </li>

</ul>


    
  </div>
</div>

      

        


      <div id="start-of-content" class="accessibility-aid"></div>
          <div class="site" itemscope itemtype="http://schema.org/WebPage">
    <div id="js-flash-container">
      
    </div>
    <div class="pagehead repohead instapaper_ignore readability-menu">
      <div class="container">
        
<ul class="pagehead-actions">

    <li class="subscription">
      <form accept-charset="UTF-8" action="/notifications/subscribe" class="js-social-container" data-autosubmit="true" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="gKKkMzJOp35nQ6I5k3fgLE6mdYYjCMwtmoE0NZmkbfJH5GWlpUODmT0Uh7dArgFox1rIrMu0jRKPJilPACv2Eg==" /></div>  <input id="repository_id" name="repository_id" type="hidden" value="11844949" />

    <div class="select-menu js-menu-container js-select-menu">
      <a class="social-count js-social-count" href="/JillElaine/jquery-idleTimeout/watchers">
        6
      </a>
      <a href="/JillElaine/jquery-idleTimeout/subscription"
        class="minibutton select-menu-button with-count js-menu-target" role="button" tabindex="0" aria-haspopup="true">
        <span class="js-select-button">
          <span class="octicon octicon-eye"></span>
          Watch
        </span>
      </a>

      <div class="select-menu-modal-holder">
        <div class="select-menu-modal subscription-menu-modal js-menu-content" aria-hidden="true">
          <div class="select-menu-header">
            <span class="select-menu-title">Notifications</span>
            <span class="octicon octicon-x js-menu-close" role="button" aria-label="Close"></span>
          </div> <!-- /.select-menu-header -->

          <div class="select-menu-list js-navigation-container" role="menu">

            <div class="select-menu-item js-navigation-item selected" role="menuitem" tabindex="0">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input checked="checked" id="do_included" name="do" type="radio" value="included" />
                <h4>Not watching</h4>
                <span class="description">Be notified when participating or @mentioned.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-eye"></span>
                  Watch
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

            <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
              <span class="select-menu-item-icon octicon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input id="do_subscribed" name="do" type="radio" value="subscribed" />
                <h4>Watching</h4>
                <span class="description">Be notified of all conversations.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-eye"></span>
                  Unwatch
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

            <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input id="do_ignore" name="do" type="radio" value="ignore" />
                <h4>Ignoring</h4>
                <span class="description">Never be notified.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-mute"></span>
                  Stop ignoring
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

          </div> <!-- /.select-menu-list -->

        </div> <!-- /.select-menu-modal -->
      </div> <!-- /.select-menu-modal-holder -->
    </div> <!-- /.select-menu -->

</form>
    </li>

  <li>
    
  <div class="js-toggler-container js-social-container starring-container ">

    <form accept-charset="UTF-8" action="/JillElaine/jquery-idleTimeout/unstar" class="js-toggler-form starred js-unstar-button" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="sqDbAqXbAdUmQ2q7MICZV3/JJufMl84sDevApw/GTcu4JJKOIYUH39VjNhxawcZXQaVYaNTTaXZ9TYT/UEaK4w==" /></div>
      <button
        class="minibutton with-count js-toggler-target star-button"
        aria-label="Unstar this repository" title="Unstar JillElaine/jquery-idleTimeout">
        <span class="octicon octicon-star"></span>
        Unstar
      </button>
        <a class="social-count js-social-count" href="/JillElaine/jquery-idleTimeout/stargazers">
          8
        </a>
</form>
    <form accept-charset="UTF-8" action="/JillElaine/jquery-idleTimeout/star" class="js-toggler-form unstarred js-star-button" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="TV1r406AXEYYW4QyFTKVA2C0rsejHWCp+jJwHzd+uRVl/4f/wJ0N3pazF/HVHguVZ78HLP8zSz2kgd2pbz46cw==" /></div>
      <button
        class="minibutton with-count js-toggler-target star-button"
        aria-label="Star this repository" title="Star JillElaine/jquery-idleTimeout">
        <span class="octicon octicon-star"></span>
        Star
      </button>
        <a class="social-count js-social-count" href="/JillElaine/jquery-idleTimeout/stargazers">
          8
        </a>
</form>  </div>

  </li>


        <li>
          <a href="/JillElaine/jquery-idleTimeout/fork" class="minibutton with-count js-toggler-target fork-button tooltipped-n" title="Fork your own copy of JillElaine/jquery-idleTimeout to your account" aria-label="Fork your own copy of JillElaine/jquery-idleTimeout to your account" rel="nofollow" data-method="post">
            <span class="octicon octicon-repo-forked"></span>
            Fork
          </a>
          <a href="/JillElaine/jquery-idleTimeout/network" class="social-count">24</a>
        </li>

</ul>

        <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public">
          <span class="mega-octicon octicon-repo-forked"></span>
          <span class="author"><a href="/JillElaine" class="url fn" itemprop="url" rel="author"><span itemprop="title">JillElaine</span></a></span><!--
       --><span class="path-divider">/</span><!--
       --><strong><a href="/JillElaine/jquery-idleTimeout" class="js-current-repository" data-pjax="#js-repo-pjax-container">jquery-idleTimeout</a></strong>

          <span class="page-context-loader">
            <img alt="" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
          </span>

            <span class="fork-flag">
              <span class="text">forked from <a href="/josebalius/jquery-idleTimeout">josebalius/jquery-idleTimeout</a></span>
            </span>
        </h1>
      </div><!-- /.container -->
    </div><!-- /.repohead -->

    <div class="container">
      <div class="repository-with-sidebar repo-container new-discussion-timeline  ">
        <div class="repository-sidebar clearfix">
            
<nav class="sunken-menu repo-nav js-repo-nav js-sidenav-container-pjax js-octicon-loaders"
     role="navigation"
     data-pjax="#js-repo-pjax-container"
     data-issue-count-url="/JillElaine/jquery-idleTimeout/issues/counts">
  <ul class="sunken-menu-group">
    <li class="tooltipped tooltipped-w" aria-label="Code">
      <a href="/JillElaine/jquery-idleTimeout" aria-label="Code" class="selected js-selected-navigation-item sunken-menu-item" data-hotkey="g c" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches /JillElaine/jquery-idleTimeout">
        <span class="octicon octicon-code"></span> <span class="full-word">Code</span>
        <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>    </li>

      <li class="tooltipped tooltipped-w" aria-label="Issues">
        <a href="/JillElaine/jquery-idleTimeout/issues" aria-label="Issues" class="js-selected-navigation-item sunken-menu-item" data-hotkey="g i" data-selected-links="repo_issues repo_labels repo_milestones /JillElaine/jquery-idleTimeout/issues">
          <span class="octicon octicon-issue-opened"></span> <span class="full-word">Issues</span>
          <span class="js-issue-replace-counter"></span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

    <li class="tooltipped tooltipped-w" aria-label="Pull Requests">
      <a href="/JillElaine/jquery-idleTimeout/pulls" aria-label="Pull Requests" class="js-selected-navigation-item sunken-menu-item" data-hotkey="g p" data-selected-links="repo_pulls /JillElaine/jquery-idleTimeout/pulls">
          <span class="octicon octicon-git-pull-request"></span> <span class="full-word">Pull Requests</span>
          <span class="js-pull-replace-counter"></span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>    </li>


      <li class="tooltipped tooltipped-w" aria-label="Wiki">
        <a href="/JillElaine/jquery-idleTimeout/wiki" aria-label="Wiki" class="js-selected-navigation-item sunken-menu-item" data-hotkey="g w" data-selected-links="repo_wiki /JillElaine/jquery-idleTimeout/wiki">
          <span class="octicon octicon-book"></span> <span class="full-word">Wiki</span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>
  </ul>
  <div class="sunken-menu-separator"></div>
  <ul class="sunken-menu-group">

    <li class="tooltipped tooltipped-w" aria-label="Pulse">
      <a href="/JillElaine/jquery-idleTimeout/pulse" aria-label="Pulse" class="js-selected-navigation-item sunken-menu-item" data-selected-links="pulse /JillElaine/jquery-idleTimeout/pulse">
        <span class="octicon octicon-pulse"></span> <span class="full-word">Pulse</span>
        <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>    </li>

    <li class="tooltipped tooltipped-w" aria-label="Graphs">
      <a href="/JillElaine/jquery-idleTimeout/graphs" aria-label="Graphs" class="js-selected-navigation-item sunken-menu-item" data-selected-links="repo_graphs repo_contributors /JillElaine/jquery-idleTimeout/graphs">
        <span class="octicon octicon-graph"></span> <span class="full-word">Graphs</span>
        <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>    </li>
  </ul>


</nav>

              <div class="only-with-full-nav">
                
  
<div class="clone-url open"
  data-protocol-type="http"
  data-url="/users/set_protocol?protocol_selector=http&amp;protocol_type=clone">
  <h3><span class="text-emphasized">HTTPS</span> clone URL</h3>
  <div class="input-group">
    <input type="text" class="input-mini input-monospace js-url-field"
           value="https://github.com/JillElaine/jquery-idleTimeout.git" readonly="readonly">
    <span class="input-group-button">
      <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="https://github.com/JillElaine/jquery-idleTimeout.git" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>

  
<div class="clone-url "
  data-protocol-type="ssh"
  data-url="/users/set_protocol?protocol_selector=ssh&amp;protocol_type=clone">
  <h3><span class="text-emphasized">SSH</span> clone URL</h3>
  <div class="input-group">
    <input type="text" class="input-mini input-monospace js-url-field"
           value="git@github.com:JillElaine/jquery-idleTimeout.git" readonly="readonly">
    <span class="input-group-button">
      <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="git@github.com:JillElaine/jquery-idleTimeout.git" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>

  
<div class="clone-url "
  data-protocol-type="subversion"
  data-url="/users/set_protocol?protocol_selector=subversion&amp;protocol_type=clone">
  <h3><span class="text-emphasized">Subversion</span> checkout URL</h3>
  <div class="input-group">
    <input type="text" class="input-mini input-monospace js-url-field"
           value="https://github.com/JillElaine/jquery-idleTimeout" readonly="readonly">
    <span class="input-group-button">
      <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="https://github.com/JillElaine/jquery-idleTimeout" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>


<p class="clone-options">You can clone with
      <a href="#" class="js-clone-selector" data-protocol="http">HTTPS</a>,
      <a href="#" class="js-clone-selector" data-protocol="ssh">SSH</a>,
      or <a href="#" class="js-clone-selector" data-protocol="subversion">Subversion</a>.
  <a href="https://help.github.com/articles/which-remote-url-should-i-use" class="help tooltipped tooltipped-n" aria-label="Get help on which URL is right for you.">
    <span class="octicon octicon-question"></span>
  </a>
</p>



                <a href="/JillElaine/jquery-idleTimeout/archive/master.zip"
                   class="minibutton sidebar-button"
                   aria-label="Download the contents of JillElaine/jquery-idleTimeout as a zip file"
                   title="Download the contents of JillElaine/jquery-idleTimeout as a zip file"
                   rel="nofollow">
                  <span class="octicon octicon-cloud-download"></span>
                  Download ZIP
                </a>
              </div>
        </div><!-- /.repository-sidebar -->

        <div id="js-repo-pjax-container" class="repository-content context-loader-container" data-pjax-container>
          

<a href="/JillElaine/jquery-idleTimeout/blob/febb0c4a5399f7b23931c4d23977fb5fe5579a75/README.md" class="hidden js-permalink-shortcut" data-hotkey="y">Permalink</a>

<!-- blob contrib key: blob_contributors:v21:c4fe96414e14ba510ac6bf2099b02d16 -->

<div class="file-navigation">
  
<div class="select-menu js-menu-container js-select-menu left">
  <span class="minibutton select-menu-button js-menu-target css-truncate" data-hotkey="w"
    data-master-branch="master"
    data-ref="master"
    title="master"
    role="button" aria-label="Switch branches or tags" tabindex="0" aria-haspopup="true">
    <span class="octicon octicon-git-branch"></span>
    <i>branch:</i>
    <span class="js-select-button css-truncate-target">master</span>
  </span>

  <div class="select-menu-modal-holder js-menu-content js-navigation-container" data-pjax aria-hidden="true">

    <div class="select-menu-modal">
      <div class="select-menu-header">
        <span class="select-menu-title">Switch branches/tags</span>
        <span class="octicon octicon-x js-menu-close" role="button" aria-label="Close"></span>
      </div> <!-- /.select-menu-header -->

      <div class="select-menu-filters">
        <div class="select-menu-text-filter">
          <input type="text" aria-label="Filter branches/tags" id="context-commitish-filter-field" class="js-filterable-field js-navigation-enable" placeholder="Filter branches/tags">
        </div>
        <div class="select-menu-tabs">
          <ul>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="branches" class="js-select-menu-tab">Branches</a>
            </li>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="tags" class="js-select-menu-tab">Tags</a>
            </li>
          </ul>
        </div><!-- /.select-menu-tabs -->
      </div><!-- /.select-menu-filters -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="branches">

        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/JillElaine/jquery-idleTimeout/blob/gh-pages/README.md"
                 data-name="gh-pages"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="gh-pages">gh-pages</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item selected">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/JillElaine/jquery-idleTimeout/blob/master/README.md"
                 data-name="master"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="master">master</a>
            </div> <!-- /.select-menu-item -->
        </div>

          <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="tags">
        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/JillElaine/jquery-idleTimeout/tree/1.0.8/README.md"
                 data-name="1.0.8"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="1.0.8">1.0.8</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/JillElaine/jquery-idleTimeout/tree/1.0.7.1/README.md"
                 data-name="1.0.7.1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="1.0.7.1">1.0.7.1</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/JillElaine/jquery-idleTimeout/tree/1.0.7/README.md"
                 data-name="1.0.7"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="1.0.7">1.0.7</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/JillElaine/jquery-idleTimeout/tree/1.0.6/README.md"
                 data-name="1.0.6"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="1.0.6">1.0.6</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/JillElaine/jquery-idleTimeout/tree/1.0.5/README.md"
                 data-name="1.0.5"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="1.0.5">1.0.5</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/JillElaine/jquery-idleTimeout/tree/1.0.4/README.md"
                 data-name="1.0.4"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="1.0.4">1.0.4</a>
            </div> <!-- /.select-menu-item -->
        </div>

        <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

    </div> <!-- /.select-menu-modal -->
  </div> <!-- /.select-menu-modal-holder -->
</div> <!-- /.select-menu -->

  <div class="button-group right">
    <a href="/JillElaine/jquery-idleTimeout/find/master"
          class="js-show-file-finder minibutton empty-icon tooltipped tooltipped-s"
          data-pjax
          data-hotkey="t"
          aria-label="Quickly jump between files">
      <span class="octicon octicon-list-unordered"></span>
    </a>
    <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="README.md" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
  </div>

  <div class="breadcrumb">
    <span class='repo-root js-repo-root'><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/JillElaine/jquery-idleTimeout" class="" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">jquery-idleTimeout</span></a></span></span><span class="separator"> / </span><strong class="final-path">README.md</strong>
  </div>
</div>


  <div class="commit file-history-tease">
    <div class="file-history-tease-header">
        <img alt="JillElaine" class="avatar" data-user="1692562" height="24" src="https://avatars3.githubusercontent.com/u/1692562?v=3&amp;s=48" width="24" />
        <span class="author"><a href="/JillElaine" rel="author">JillElaine</a></span>
        <time datetime="2014-07-19T15:38:06Z" is="relative-time">Jul 19, 2014</time>
        <div class="commit-title">
            <a href="/JillElaine/jquery-idleTimeout/commit/eb65381969904e3bf41a1e4ff3884ca7e9e5f12b" class="message" data-pjax="true" title="Add ability to disable dialog. Change timer units.

Closes issue #8. Change configurable timers&#39; units from milliseconds to
seconds.">Add ability to disable dialog. Change timer units.</a>
        </div>
    </div>

    <div class="participation">
      <p class="quickstat">
        <a href="#blob_contributors_box" rel="facebox">
          <strong>4</strong>
           contributors
        </a>
      </p>
          <a class="avatar-link tooltipped tooltipped-s" aria-label="JillElaine" href="/JillElaine/jquery-idleTimeout/commits/master/README.md?author=JillElaine"><img alt="JillElaine" class="avatar" data-user="1692562" height="20" src="https://avatars1.githubusercontent.com/u/1692562?v=3&amp;s=40" width="20" /></a>
    <a class="avatar-link tooltipped tooltipped-s" aria-label="philpalmieri" href="/JillElaine/jquery-idleTimeout/commits/master/README.md?author=philpalmieri"><img alt="Phil Palmieri" class="avatar" data-user="170333" height="20" src="https://avatars2.githubusercontent.com/u/170333?v=3&amp;s=40" width="20" /></a>
    <a class="avatar-link tooltipped tooltipped-s" aria-label="josebalius" href="/JillElaine/jquery-idleTimeout/commits/master/README.md?author=josebalius"><img alt="Jose Garcia" class="avatar" data-user="339080" height="20" src="https://avatars3.githubusercontent.com/u/339080?v=3&amp;s=40" width="20" /></a>
    <a class="avatar-link tooltipped tooltipped-s" aria-label="tomyvi" href="/JillElaine/jquery-idleTimeout/commits/master/README.md?author=tomyvi"><img alt="tomyvi" class="avatar" data-user="2725792" height="20" src="https://avatars3.githubusercontent.com/u/2725792?v=3&amp;s=40" width="20" /></a>


    </div>
    <div id="blob_contributors_box" style="display:none">
      <h2 class="facebox-header">Users who have contributed to this file</h2>
      <ul class="facebox-user-list">
          <li class="facebox-user-list-item">
            <img alt="JillElaine" data-user="1692562" height="24" src="https://avatars3.githubusercontent.com/u/1692562?v=3&amp;s=48" width="24" />
            <a href="/JillElaine">JillElaine</a>
          </li>
          <li class="facebox-user-list-item">
            <img alt="Phil Palmieri" data-user="170333" height="24" src="https://avatars0.githubusercontent.com/u/170333?v=3&amp;s=48" width="24" />
            <a href="/philpalmieri">philpalmieri</a>
          </li>
          <li class="facebox-user-list-item">
            <img alt="Jose Garcia" data-user="339080" height="24" src="https://avatars1.githubusercontent.com/u/339080?v=3&amp;s=48" width="24" />
            <a href="/josebalius">josebalius</a>
          </li>
          <li class="facebox-user-list-item">
            <img alt="tomyvi" data-user="2725792" height="24" src="https://avatars1.githubusercontent.com/u/2725792?v=3&amp;s=48" width="24" />
            <a href="/tomyvi">tomyvi</a>
          </li>
      </ul>
    </div>
  </div>

<div class="file-box">
  <div class="file">
    <div class="meta clearfix">
      <div class="info file-name">
          <span>125 lines (89 sloc)</span>
          <span class="meta-divider"></span>
        <span>6.657 kb</span>
      </div>
      <div class="actions">
        <div class="button-group">
          <a href="/JillElaine/jquery-idleTimeout/raw/master/README.md" class="minibutton " id="raw-url">Raw</a>
            <a href="/JillElaine/jquery-idleTimeout/blame/master/README.md" class="minibutton js-update-url-with-hash">Blame</a>
          <a href="/JillElaine/jquery-idleTimeout/commits/master/README.md" class="minibutton " rel="nofollow">History</a>
        </div><!-- /.button-group -->


              <a class="octicon-button tooltipped tooltipped-n js-update-url-with-hash"
                 aria-label="Clicking this button will fork this project so you can edit the file"
                 href="/JillElaine/jquery-idleTimeout/edit/master/README.md"
                 data-method="post" rel="nofollow"><span class="octicon octicon-pencil"></span></a>

            <a class="octicon-button danger tooltipped tooltipped-s"
               href="/JillElaine/jquery-idleTimeout/delete/master/README.md"
               aria-label="Fork this project and delete file"
               data-method="post" data-test-id="delete-blob-file" rel="nofollow">
          <span class="octicon octicon-trashcan"></span>
        </a>
      </div><!-- /.actions -->
    </div>
    
  <div id="readme" class="blob instapaper_body">
    <article class="markdown-body entry-content" itemprop="mainContentOfPage"><h1>
<a id="user-content-jquery-idletimeout" class="anchor" href="#jquery-idletimeout" aria-hidden="true"><span class="octicon octicon-link"></span></a>jquery-idleTimeout</h1>

<p>Configurable idle (no activity) timer and logout redirect for jQuery.</p>

<p><strong>Functions across multiple browser windows, tabs and, optionally, iframes in the same domain.</strong></p>

<p>Listed on JQuery's Plugin site: <a href="http://plugins.jquery.com/idleTimeout/">http://plugins.jquery.com/idleTimeout/</a></p>

<p>Requires <a href="https://github.com/marcuswestin/store.js">https://github.com/marcuswestin/store.js</a> which uses localStorage, globalStorage and userData behavior to 'communicate' across multiple browser windows/tabs without cookies or flash.</p>

<h3>
<a id="user-content-demo-page---httpjillelainegithubiojquery-idletimeout" class="anchor" href="#demo-page---httpjillelainegithubiojquery-idletimeout" aria-hidden="true"><span class="octicon octicon-link"></span></a>Demo Page - <a href="http://jillelaine.github.io/jquery-idleTimeout/">http://jillelaine.github.io/jquery-idleTimeout/</a>
</h3>

<h4>
<a id="user-content-iframes-demo-page---httpjillelainegithubiojquery-idletimeoutiframe-demohtml" class="anchor" href="#iframes-demo-page---httpjillelainegithubiojquery-idletimeoutiframe-demohtml" aria-hidden="true"><span class="octicon octicon-link"></span></a>Iframes Demo Page - <a href="http://jillelaine.github.io/jquery-idleTimeout/iframe-demo.html">http://jillelaine.github.io/jquery-idleTimeout/iframe-demo.html</a>
</h4>

<p>If the warning dialog box is not disabled:</p>

<ul class="task-list">
<li>After the 'idleTimeLimit' amount of user inactivity, the warning dialog box with 2 buttons, 'Stay Logged In' &amp; 'Log Out Now', appears. 'Stay Logged In' button may be activated with mouse click or press of Enter key.</li>
<li>Warning dialog includes countdown 'Time remaining' display.</li>
<li>Browser window/tab title bar(s) display warning if user is inactive for the 'idleTimeLimit'. Original browser title restored to all windows/tabs when warning dialog is dismissed.</li>
<li>Warning dialog will display for the 'dialogDisplayLimit' amount of time. If no user activity, idleTimer will redirect to configured 'redirectUrl'.</li>
</ul>

<p><a href="https://camo.githubusercontent.com/de0c02429efd67b637d25e924ca3c9cafa78261f/68747470733a2f2f7261772e6769746875622e636f6d2f4a696c6c456c61696e652f6a71756572792d69646c6554696d656f75742f6d61737465722f7761726e696e675f6469616c6f672e706e67" target="_blank"><img src="https://camo.githubusercontent.com/de0c02429efd67b637d25e924ca3c9cafa78261f/68747470733a2f2f7261772e6769746875622e636f6d2f4a696c6c456c61696e652f6a71756572792d69646c6554696d656f75742f6d61737465722f7761726e696e675f6469616c6f672e706e67" alt="Warning Dialog" data-canonical-src="https://raw.github.com/JillElaine/jquery-idleTimeout/master/warning_dialog.png" style="max-width:100%;"></a></p>

<p>If the warning dialog box is disabled:</p>

<ul class="task-list">
<li>After the 'idleTimeLimit' amount of user inactivity, idleTimer will redirect to configured 'redirectUrl'.</li>
<li>No warning dialog box will appear and browser window/tab title bar(s) do not display a warning.</li>
</ul>

<p>Custom logout (session close) functions may be added to your 'redirectUrl' page or to the optional configuration's 'customCallback'.</p>

<h3>
<a id="user-content-communication-across-multiple-browser-windows-tabs-and-iframes-in-the-same-domain" class="anchor" href="#communication-across-multiple-browser-windows-tabs-and-iframes-in-the-same-domain" aria-hidden="true"><span class="octicon octicon-link"></span></a>Communication Across Multiple Browser Windows, Tabs and Iframes in the Same Domain</h3>

<ul class="task-list">
<li>Functions across multiple instances of a browser and across multiple tabs within the same domain</li>
<li>Use <strong>jquery-idleTimeout-iframes.js</strong> if detection of activity within iframes is desired</li>
<li>If a window or tab is logged out, all other windows and tabs will log out too.</li>
<li>If enabled, if <strong>warning dialog</strong> pops up on a window or tab, <strong>warning dialog</strong> appears on all other windows and tabs too.</li>
<li>If <strong>'Stay Logged In'</strong> button on <strong>warning dialog</strong> is clicked, warning dialogs on all other windows and tabs will be dismissed too.</li>
<li>If <strong>'Log Out Now'</strong> button on <strong>warning dialog</strong> is clicked, all other windows and tabs will log out too.</li>
<li>Optional script to add to your site's <strong>Logout</strong> button</li>
<li>Pings server every 10 minutes (default) to prevent server-side session timeout</li>
</ul>

<h3>
<a id="user-content-dependencies" class="anchor" href="#dependencies" aria-hidden="true"><span class="octicon octicon-link"></span></a>Dependencies</h3>

<p>The following dependency is required: <a href="https://github.com/marcuswestin/store.js">https://github.com/marcuswestin/store.js</a> - version 1.3.4+</p>

<p>Additionally, JQuery version 1.7+ and JQuery UI are required.</p>

<h2>
<a id="user-content-how-to-use" class="anchor" href="#how-to-use" aria-hidden="true"><span class="octicon octicon-link"></span></a>How to Use</h2>

<p>Download the minified code, jquery-idleTimeout.min.js or jquery-idleTimeout-iframes.min.js, or download jquery-idleTimeout.js if you want to edit the configuration of the script directly. Upload the .js file and make it available to your website.</p>

<p>Do the same with <a href="https://github.com/marcuswestin/store.js">https://github.com/marcuswestin/store.js</a>: store.min.js.</p>

<p>Call the idle-Timeout script in a 'document.ready' function somewhere on your site. See the example.html <a href="https://github.com/JillElaine/jquery-idleTimeout/blob/master/example.html">https://github.com/JillElaine/jquery-idleTimeout/blob/master/example.html</a></p>

<p>Configure the 'redirectUrl' to redirect to your site's logout page.</p>

<p>Use the script with default settings, configure the options when you call the idleTimeout function at run-time, or edit the configuration variables at top of jquery-idleTimeout.js.</p>

<h3>
<a id="user-content-run-with-defaults" class="anchor" href="#run-with-defaults" aria-hidden="true"><span class="octicon octicon-link"></span></a>Run with Defaults</h3>

<div class="highlight highlight-Javascript"><pre>  $(<span class="pl-s3">document</span>).ready(<span class="pl-st">function</span> () {
    $(<span class="pl-s3">document</span>).idleTimeout({
      redirectUrl<span class="pl-k">:</span>  <span class="pl-s1"><span class="pl-pds">'</span>/logout<span class="pl-pds">'</span></span> <span class="pl-c">// redirect to this url. Set this value to YOUR site's logout page.</span>
    });
  });</pre></div>

<h3>
<a id="user-content-configuration-may-be-overridden-at-run-time" class="anchor" href="#configuration-may-be-overridden-at-run-time" aria-hidden="true"><span class="octicon octicon-link"></span></a>Configuration May be Overridden at Run-Time</h3>

<div class="highlight highlight-Javascript"><pre>  $(<span class="pl-s3">document</span>).ready(<span class="pl-st">function</span> () {
    $(<span class="pl-s3">document</span>).idleTimeout({
      idleTimeLimit<span class="pl-k">:</span> <span class="pl-c1">1200</span>,       <span class="pl-c">// 'No activity' time limit in seconds. 1200 = 20 Minutes</span>
      redirectUrl<span class="pl-k">:</span> <span class="pl-s1"><span class="pl-pds">'</span>/logout<span class="pl-pds">'</span></span>,    <span class="pl-c">// redirect to this url on timeout logout. Set to "redirectUrl: false" to disable redirect</span>

      <span class="pl-c">// optional custom callback to perform before logout</span>
      customCallback<span class="pl-k">:</span> <span class="pl-c1">false</span>,     <span class="pl-c">// set to false for no customCallback</span>
      <span class="pl-c">// customCallback:    function () {    // define optional custom js function</span>
          <span class="pl-c">// perform custom action before logout</span>
      <span class="pl-c">// },</span>

      <span class="pl-c">// configure which activity events to detect</span>
      <span class="pl-c">// http://www.quirksmode.org/dom/events/</span>
      <span class="pl-c">// https://developer.mozilla.org/en-US/docs/Web/Reference/Events</span>
      activityEvents<span class="pl-k">:</span> <span class="pl-s1"><span class="pl-pds">'</span>click keypress scroll wheel mousewheel mousemove<span class="pl-pds">'</span></span>, <span class="pl-c">// separate each event with a space</span>

      <span class="pl-c">// warning dialog box configuration</span>
      enableDialog<span class="pl-k">:</span> <span class="pl-c1">true</span>,        <span class="pl-c">// set to false for logout without warning dialog</span>
      dialogDisplayLimit<span class="pl-k">:</span> <span class="pl-c1">180</span>,   <span class="pl-c">// time to display the warning dialog before logout (and optional callback) in seconds. 180 = 3 Minutes</span>
      dialogTitle<span class="pl-k">:</span> <span class="pl-s1"><span class="pl-pds">'</span>Session Expiration Warning<span class="pl-pds">'</span></span>,
      dialogText<span class="pl-k">:</span> <span class="pl-s1"><span class="pl-pds">'</span>Because you have been inactive, your session is about to expire.<span class="pl-pds">'</span></span>,

      <span class="pl-c">// server-side session keep-alive timer</span>
      sessionKeepAliveTimer<span class="pl-k">:</span> <span class="pl-c1">600</span> <span class="pl-c">// Ping the server at this interval in seconds. 600 = 10 Minutes</span>
      <span class="pl-c">// sessionKeepAliveTimer: false // Set to false to disable pings</span>
    });
  });</pre></div>

<h2>
<a id="user-content-optional-functionality-for-voluntary-logout" class="anchor" href="#optional-functionality-for-voluntary-logout" aria-hidden="true"><span class="octicon octicon-link"></span></a>Optional Functionality for Voluntary Logout</h2>

<p>If user voluntarily logs out of your site with your 'Logout' button (instead of timing out), you can force all 'same domain' windows/tabs to log out too! Attach a small snippet of javascript to the 'onclick' function of your 'Logout' button.</p>

<h5>
<a id="user-content-create-voluntarylogoutall-function-to-attach-to-logout-button" class="anchor" href="#create-voluntarylogoutall-function-to-attach-to-logout-button" aria-hidden="true"><span class="octicon octicon-link"></span></a>Create 'voluntaryLogoutAll' Function to Attach to Logout Button</h5>

<div class="highlight highlight-Javascript"><pre>  <span class="pl-k">&lt;</span>script type<span class="pl-k">=</span><span class="pl-s1"><span class="pl-pds">"</span>text/javascript<span class="pl-pds">"</span></span><span class="pl-k">&gt;</span>
      <span class="pl-s">var</span> <span class="pl-en">voluntaryLogoutAll</span> <span class="pl-k">=</span> <span class="pl-st">function</span> () {
        <span class="pl-k">if</span> (store.enabled) {
          store.set(<span class="pl-s1"><span class="pl-pds">'</span>idleTimerLoggedOut<span class="pl-pds">'</span></span>, <span class="pl-c1">true</span>);
          <span class="pl-s3">window</span>.<span class="pl-sc">location</span>.<span class="pl-sc">href</span> <span class="pl-k">=</span> <span class="pl-s1"><span class="pl-pds">"</span>/logout<span class="pl-pds">"</span></span>;      <span class="pl-c">// redirect to this url. Set this value to YOUR site's logout page.</span>
        } <span class="pl-k">else</span> {
          <span class="pl-s3">alert</span>(<span class="pl-s1"><span class="pl-pds">'</span>Please disable "Private Mode", or upgrade to a modern browser. Or perhaps a dependent file missing. Please see: https://github.com/marcuswestin/store.js<span class="pl-pds">'</span></span>)
        }
      }
  <span class="pl-k">&lt;</span>/script<span class="pl-k">&gt;</span></pre></div>

<h5>
<a id="user-content-call-the-voluntarylogoutall-function-with-the-onclick-of-your-logout-button" class="anchor" href="#call-the-voluntarylogoutall-function-with-the-onclick-of-your-logout-button" aria-hidden="true"><span class="octicon octicon-link"></span></a>Call the 'voluntaryLogoutAll' Function with the 'onclick' of Your Logout Button</h5>

<pre><code>&lt;input type="button" value="Logout" onclick="voluntaryLogoutAll()" title="This button will logout ALL 'same domain' Windows/Tabs"&gt;
</code></pre>

<p>Use jquery-idleTimeout-for-testing.js with Firefox with Firebug add-on or similar for debugging. Thank you for your feedback.</p>
</article>
  </div>

  </div>
</div>

<a href="#jump-to-line" rel="facebox[.linejump]" data-hotkey="l" style="display:none">Jump to Line</a>
<div id="jump-to-line" style="display:none">
  <form accept-charset="UTF-8" class="js-jump-to-line-form">
    <input class="linejump-input js-jump-to-line-field" type="text" placeholder="Jump to line&hellip;" autofocus>
    <button type="submit" class="button">Go</button>
  </form>
</div>

        </div>

      </div><!-- /.repo-container -->
      <div class="modal-backdrop"></div>
    </div><!-- /.container -->
  </div><!-- /.site -->


    </div><!-- /.wrapper -->

      <div class="container">
  <div class="site-footer" role="contentinfo">
    <ul class="site-footer-links right">
      <li><a href="https://status.github.com/">Status</a></li>
      <li><a href="https://developer.github.com">API</a></li>
      <li><a href="http://training.github.com">Training</a></li>
      <li><a href="http://shop.github.com">Shop</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/about">About</a></li>

    </ul>

    <a href="/" aria-label="Homepage">
      <span class="mega-octicon octicon-mark-github" title="GitHub"></span>
    </a>

    <ul class="site-footer-links">
      <li>&copy; 2014 <span title="0.05679s from github-fe127-cp1-prd.iad.github.net">GitHub</span>, Inc.</li>
        <li><a href="/site/terms">Terms</a></li>
        <li><a href="/site/privacy">Privacy</a></li>
        <li><a href="/security">Security</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
  </div><!-- /.site-footer -->
</div><!-- /.container -->


    <div class="fullscreen-overlay js-fullscreen-overlay" id="fullscreen_overlay">
  <div class="fullscreen-container js-suggester-container">
    <div class="textarea-wrap">
      <textarea name="fullscreen-contents" id="fullscreen-contents" class="fullscreen-contents js-fullscreen-contents js-suggester-field" placeholder=""></textarea>
    </div>
  </div>
  <div class="fullscreen-sidebar">
    <a href="#" class="exit-fullscreen js-exit-fullscreen tooltipped tooltipped-w" aria-label="Exit Zen Mode">
      <span class="mega-octicon octicon-screen-normal"></span>
    </a>
    <a href="#" class="theme-switcher js-theme-switcher tooltipped tooltipped-w"
      aria-label="Switch themes">
      <span class="octicon octicon-color-mode"></span>
    </a>
  </div>
</div>



    <div id="ajax-error-message" class="flash flash-error">
      <span class="octicon octicon-alert"></span>
      <a href="#" class="octicon octicon-x flash-close js-ajax-error-dismiss" aria-label="Dismiss error"></a>
      Something went wrong with that request. Please try again.
    </div>


      <script crossorigin="anonymous" src="https://assets-cdn.github.com/assets/frameworks-2d727fed4d969b14b28165c75ad12d7dddd56c0198fa70cedc3fdad7ac395b2c.js" type="text/javascript"></script>
      <script async="async" crossorigin="anonymous" src="https://assets-cdn.github.com/assets/github-f3e9a2204fcfc6f7dde250e61ca35353411880024102cba14a0bd45f05f1e74f.js" type="text/javascript"></script>
      
      
  </body>
</html>

