<?php
// Array with names
$eventstArray[] = array(
            'label' => 'asdasd',
            'venue' => 'asdds',
            'category' => 'asdasd',
            'price' => 'asdasd',
            'description' => 'asdasd'
        );

echo $eventstArray;

// Output "no suggestion" if no hint was found or output correct values 
return json_encode($eventstArray);
?>