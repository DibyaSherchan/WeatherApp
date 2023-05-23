<?php 
include 'DibyaSherchan_2334057_connection.php';
?>
<button style="text-align:center;" style = "color:black;"><a href="DibyaSherchan_2334057_index.php">Home</a></button>
<center>
  <h1 style="text-align:left;">All Records</h1>
  <?php 
  $query = "SELECT * FROM weather ORDER BY id DESC LIMIT 7";
  $result = mysqli_query($con, $query);
  $show = mysqli_num_rows($result);
  
  if ($show > 0) {
    echo "<table border=\"1px\" cellspacing=\"0\" cellpadding=\"10px\">";
    echo "<tr>";
    echo "<th colspan=\"2\">Date and Day</th>";
    echo "<th colspan=\"1\">City Name</th>";
    echo "<th>Temperature</th>";
    echo "<th>Is_Like</th>";
    echo "<th>Description</th>";
    echo "<th>Pressure</th>";
    echo "<th>Humidity</th>";
    echo "<th>Wind Speed</th>";
    echo "<th>Wind Direction</th>";
    echo "<th>Icon</th>";
    echo "</tr>";
    
    while ($row = mysqli_fetch_assoc($result)) {
      $day = date("l", strtotime($row['D_T']));
      $date = date("d M, Y", strtotime($row['D_T']));
      echo "<tr>";
      echo "<td>$day</td>";
      echo "<td>$date</td>";
      echo "<td>{$row['Searched_City']}</td>";
      echo "<td>{$row['Temp']} &deg;C</td>";
      echo "<td>{$row['Is_Like']} &deg;C</td>";
      echo "<td>{$row['Description']}</td>";
      echo "<td>{$row['Pressure']} hPa</td>";
      echo "<td>{$row['Humidity']}%</td>";
      echo "<td>{$row['Wind_Spd']} m/s</td>";
      echo "<td>{$row['Wind_Dir']} &deg;</td>";
      echo "<td><img src=\"https://openweathermap.org/img/w/{$row['Icon']}.png\"></td>";
      echo "</tr>";
    }
    
    echo "</table>";
  } else {
    echo "No records found.";
  }
  
  mysqli_close($con);
  ?>
</center>
