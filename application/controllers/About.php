<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class About extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('about_model');
	}
	
	public function index()
	{
        $news = $this->about_model->get_content();

		$data = array(
            'news' => $news
			);
			
		$this->twig->display('about', $data);
	}
}
