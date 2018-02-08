<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Err404 extends CI_Controller {

	function __construct()
    {
        // 呼叫模型(Model)的建構函數
        parent::__construct();

    }
    
	public function index()
	{
	
		$this->twig->display('pages/err404');
	}
	
	
}
