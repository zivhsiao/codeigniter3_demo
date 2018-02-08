# Vagrant 安裝  / 設定

## 第一次新增 box

### 這裡採用  virtualbox ，沒有的就趕快裝起來

### Ubuntu 16.04 ＋ php7.1 + mariaDB (mySQL) 的映象檔 

    vagrant init patrickher/unbutu_php71 --box-version 1.0
    vagrant up
    
這需要等待一點時間，去泡杯咖啡吧！    

然後要對 VM 處理的動作了

    vagrant up/ssh/reload/halt

需要修改 Vagrantfile

    # -*- mode: ruby -*-
    # vi: set ft=ruby :

    Vagrant.configure("2") do |config|
       config.vm.box = "patrickher/unbutu_php71"
       config.vm.synced_folder ".", "/vagrant",  :mount_options => ["dmode=777,fmode=777"]
       config.vm.network "forwarded_port", guest: 80, host: 8000
       config.vm.network "forwarded_port", guest: 3306, host: 3366
    end
    
### 修改 apache2.conf

vagrant 用的是 /vagrant 當做對應資料夾

所以將 apache2 啟動的預設的資料夾放在這裡

    vim /etc/apache2/sites-enabled/000-default.conf

    ServerAdmin webmaster@localhost
    DocumentRoot /vagrant/ci-demo

    <Directory /vagrant/ci-demo>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
### 上面是 vagrant 的 apache2 + php7.1 + mariadb 的安裝    

## 這裡就進入 CI 的世界，前置作業

    git clone https://github.com/zivhsiao/ci-demo.git

先 git 一份，這裡會產生 ci-demo 的目錄，所以 apache2 改變成 /vagrant/ci-twig

### Controller, View 說明

他的資料夾應該如下：

    root
      +application
       system
       index.php
       .htaccess
       
直接看設定檔 config.php

    application/config/config.php
    
    裡面有幾個
    $config['base_url'] = 'http' . (isset($_SERVER['HTTPS']) ? 's' : '') . '://' . $_SERVER['HTTP_HOST'];
    $config['index_page'] = '';
    
    這兩個特別注意
           
然後看 autoload.php

    application/config/autoload.php
    
    $autoload['libraries'] = array('database', 'session', 'form_validation', 'twig', 'recaptcha');
    
    預設有 database, session, form_validation, twig, recaptcha
    其中有 twig, recaptcha 是自己安裝上去的


[Twig 的說明](https://twig.symfony.com/)

[reCAPTCHA 的說明](https://www.google.com/recaptcha/intro/android.html)

database 的話，如果沒有對應的資料庫就會出錯

    application/config/database.php
    
    'hostname' => 'localhost',
	'username' => 'root',
	'password' => 'hezrid5',
	'database' => 'demo_db',
	
這樣就完成初步的建置

[Codeigniter 3 的手冊](https://codeigniter.org.tw/userguide3/general/welcome.html)	

### 以為這樣就沒有了嗎？說起來就很簡單了，大概花個 10 ~ 20 分鐘可以了

#### Controller

    
    這是一個簡單的 Controller 
        
    檔案位置： application/controllers/Blog.php

記住：一定要開頭是大寫
    
    <?php
    class Blog extends CI_Controller {

        public function __construct()
        {
                parent::__construct();
        }

        public function index()
        {
                echo '你好嗎!';
        }
    }
    
它的意思 => http://localhost:8888/blog

如果沒有錯，會看到 [你好嗎]


#### View

接下來採用 twig，使用起來很快

以為有自動載入，所以不用呼叫 libary

    <?php
    defined('BASEPATH') OR exit('No direct script access allowed');

    class Home extends CI_Controller {

	    public function __construct()
	    {
		    parent::__construct();
	    }
	
	    public function index()
	    {
	    
		    $data = array(
			    'title' => "Title",
			 );
			
			 
		    $this->twig->display('home', $data);	
	    }
    }

直接看畫面，就有 Title 在上面了

#### Model

參考裡面的 model 就好了

Anyway, enjoy it!
