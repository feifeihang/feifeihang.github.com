<html>
    <head><title>Welcome</title></head>
    <body>
        <?php echo 'Welcome ' . $_POST['name'] . '!';?><br />
        <?php echo 'You are ' . $_POST['age'];?><br />
        <?php 
        $button = $_POST['submit'];
        if($button != 'Submit') {
        	echo 'Simples!';
        }
        else {
	        echo '<h1>' . 'To get your exclusive Meerkat toys...' . '</h1>';
        }
        ?>
        
        <hr>
        
        <?php
        mysql_connect('localhost', 'root', 'rootroot') or die(mysql_error());
        
        mysql_select_db('test') or die(mysql_error());
        
        //Retrive all the data from table
        $result = mysql_query('SELECT * FROM people') or die(mysql_error());
        $numrows = mysql_num_rows($result);
        
        //store the record into $row
        $index = 0;
        while($index < $numrows) {
        	$row = mysql_fetch_array($result);
        
	        //print out the contents of the entry
	        echo 'Name: ' . $row['FIRST_NAME'] . ' ' . $row['LAST_NAME'] . '<br />';
	        ++$index;
        }
	    
	    mysql_free_result($result);
		mysql_close();
        ?>
        
    </body>
</html>
