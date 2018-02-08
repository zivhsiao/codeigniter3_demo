<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class About_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
        $this->tablename = 'about';
    }

    public function get_content()
    {
        $query = $this->db->get($this->tablename);

        return $query->result_array();
    }



}