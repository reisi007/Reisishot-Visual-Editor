<?php
/*
Plugin Name: Reisishot Visual Editor
Version: 0.1
Description: WYSIWYG editor.
Plugin URI: 
Author: Reisishot
Author URI: https://reisishot.pictures
*/

if (!defined('PHPWG_ROOT_PATH')) die('Hacking attempt!');
add_event_handler('loc_begin_page_header', 'reisishot_summernote_js', 21);

function reisishot_summernote_js(){
  global $template;
  if (defined('IN_ADMIN') and IN_ADMIN) {
    $reisishot_js = file_get_contents("main.part.html", FILE_USE_INCLUDE_PATH);
    $template->append('head_elements',$reisishot_js);
  }

}

?>