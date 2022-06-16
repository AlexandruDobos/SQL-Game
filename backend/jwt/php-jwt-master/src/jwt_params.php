<?php
    define('JWT_KEY', "SQLGame123");
    define('JWT_ISS', "");
    define('JWT_AUD', "");
    define('JWT_IAT', time());
    define('JWT_EXP', time() + 10 * 365 * 24 * 60 * 60 );
?>