<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class System_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();

    }

    public function change_lang(){

        $lang = $this->input->post('lang');

        $this->session->set_userdata('sys_lang', $lang);
    }



}