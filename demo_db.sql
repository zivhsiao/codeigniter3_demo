-- Adminer 4.3.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `about`;
CREATE TABLE `about` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `about` (`id`, `title`, `content`) VALUES
(1,	'About Us',	'<div class=\"section\" id=\"id2\">\r\n<h1><a class=\"toc-backref\" href=\"#id6\">剖析 Model</a><a class=\"headerlink\" href=\"#id2\" title=\"Permalink to this headline\">¶</a></h1>\r\n<p>Model 類別是儲存在 <strong>application/models/</strong> 目錄。 它們可以巢狀的包含在子目錄中，如果你想要分類組織了話，這是個好方法。</p>\r\n<p>基本的 Model 類別原型長這樣：</p>\r\n<div class=\"highlight-ci\"><div class=\"highlight\"><pre>class Model_name extends CI_Model {\r\n\r\n        public function __construct()\r\n        {\r\n                parent::__construct();\r\n        }\r\n\r\n}\r\n</pre></div>\r\n</div>\r\n<p>這個 <strong>Model_name</strong> 是你的類別名稱。 類別名稱 <strong>一定要</strong> 第一個字母大寫的，其餘部分小寫的。請確認你的類別擴展基本的 Model 類別。</p>\r\n<p>檔案名稱要跟類別名稱一樣。例如：</p>\r\n<div class=\"highlight-ci\"><div class=\"highlight\"><pre>class User_model extends CI_Model {\r\n\r\n        public function __construct()\r\n        {\r\n                parent::__construct();\r\n        }\r\n\r\n}\r\n</pre></div>\r\n</div>\r\n<p>你的檔案目錄會長這樣：</p>\r\n<div class=\"highlight-ci\"><div class=\"highlight\"><pre>application/models/User_model.php\r\n</pre></div>\r\n</div>\r\n</div>');

-- 2018-01-23 12:50:52
