<?php

/////IMAGES SIZES
///// Borrado de los que vienen de serie menos thumbnail
add_filter( 'intermediate_image_sizes_advanced', 'prefix_remove_default_images' );
function prefix_remove_default_images( $sizes ) {
    unset( $sizes['thumbnail']); // 150px
    unset( $sizes['medium']); // 300px
    unset( $sizes['medium_large']); // 1024px
    unset( $sizes['large']); // 768px
    unset( $sizes['1536x1536']); // 768px
    unset( $sizes['2048x2048']); // 768px
    return $sizes;
}

add_theme_support( "post-thumbnails" );
add_image_size( '@4x', 3000);
add_image_size( '@3x', 2225);
add_image_size( '@2x', 1500);
add_image_size( '@1x', 750);
add_image_size( 'facebook', 1200, 630, true);
add_image_size( 'twitter', 600, 330, true);

///// OPTIONS
if( function_exists('acf_add_options_page') ) {

    acf_add_options_page(array(
        'page_title' 	=> 'Textos',
        'menu_title'	=> 'Textos',
        'menu_slug' 	=> 'cadenas-options',
        "icon_url"     => "dashicons-book-alt",
    ));

    acf_add_options_page(array(
        'page_title' 	=> 'General Data',
        'menu_title'	=> 'General Data',
        'menu_slug' 	=> 'general-options',
        "icon_url"     => "dashicons-visibility",
    ));

	acf_add_options_page(array(
		'page_title' 	=> 'Contact Data',
		'menu_title'	=> 'Contact Data',
		'menu_slug' 	=> 'contact-options',
		"icon_url"     => "dashicons-email-alt",
	));
}

////API REST MENUS
function get_my_menu() {
    // Replace your menu name, slug or ID carefully
    return wp_get_nav_menu_items('Main Menu');
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'wp/v2', 'menu', array(
        'methods' => 'GET',
        'callback' => 'get_my_menu',
    ) );
} );

/*
 *  Author: Nate Arnold<hello@natearnold.me>
 *  Custom functions, support, custom post types and more.
 */

function remove_menus() {
    remove_menu_page( "index.php" ); //Dashboard
    remove_menu_page( "jetpack" ); //Jetpack*
    remove_menu_page( "edit-comments.php" ); //Comments
}

add_action( "admin_menu", "remove_menus" );

// Remove Admin bar
// function remove_admin_bar()
// {
//     return false;
// }

include_once("functions/custom-post-types.php");
include_once("functions/custom-shortcodes.php");
include_once("functions/custom-taxonomies.php");

function headless_custom_menu_order( $menu_ord ) {
    if ( !$menu_ord ) return true;

    return array(
        "edit.php?post_type=page", // Pages
       // "edit.php", // Posts
       "edit.php?post_type=artists", // Custom Post Type 
       "edit.php?post_type=legales", // Custom Post Type
        "separator1", // First separator

       // "upload.php", // Media
       // "themes.php", // Appearance
        "plugins.php", // Plugins
        "users.php", // Users
        "separator2", // Second separator

        "tools.php", // Tools
        "options-general.php", // Settings
        "separator-last", // Last separator
    );
}
add_filter( "custom_menu_order", "headless_custom_menu_order", 10, 1 );
add_filter( "menu_order", "headless_custom_menu_order", 10, 1 );

function headless_disable_feed() {
    wp_die( __('No feed available, please visit our <a href="'. get_bloginfo("url") .'">homepage</a>!') );
}

add_action("do_feed", "headless_disable_feed", 1);
add_action("do_feed_rdf", "headless_disable_feed", 1);
add_action("do_feed_rss", "headless_disable_feed", 1);
add_action("do_feed_rss2", "headless_disable_feed", 1);
add_action("do_feed_atom", "headless_disable_feed", 1);
add_action("do_feed_rss2_comments", "headless_disable_feed", 1);
add_action("do_feed_atom_comments", "headless_disable_feed", 1);

// Return `null` if an empty value is returned from ACF.
if (!function_exists("acf_nullify_empty")) {
  function acf_nullify_empty($value, $post_id, $field) {
      if (empty($value)) {
          return null;
      }
      return $value;
  }
}
add_filter("acf/format_value", "acf_nullify_empty", 100, 3);
