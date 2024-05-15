In a database designed for a bus reservation system, you would typically have several tables, each representing a different aspect of the system. Here are some of the key tables and their potential columns:

1. **Bus Table**:
   - Bus ID (Primary Key)
   - Bus Number/Name
   - Capacity (Number of seats)
   - Type (e.g., sleeper, semi-sleeper, AC, non-AC)
   - Make/Model
   - Availability (e.g., active, inactive)
   - Current Location

2. **Route Table**:
   - Route ID (Primary Key)
   - Source City
   - Destination City
   - Distance
   - Duration
   - Fare
   - Departure Time
   - Arrival Time

3. **Seat Table**:
   - Seat ID (Primary Key)
   - Bus ID (Foreign Key referencing Bus Table)
   - Seat Number
   - Availability (e.g., available, booked)
   - Price

4. **Passenger Table**:
   - Passenger ID (Primary Key)
   - First Name
   - Last Name
   - Gender
   - Age
   - Contact Number
   - Email

5. **Reservation Table**:
   - Reservation ID (Primary Key)
   - Passenger ID (Foreign Key referencing Passenger Table)
   - Bus ID (Foreign Key referencing Bus Table)
   - Route ID (Foreign Key referencing Route Table)
   - Seat ID (Foreign Key referencing Seat Table)
   - Booking Date
   - Journey Date
   - Status (e.g., booked, canceled)
   - Payment Status

6. **Payment Table**:
   - Payment ID (Primary Key)
   - Reservation ID (Foreign Key referencing Reservation Table)
   - Amount
   - Payment Method
   - Transaction ID
   - Payment Date
   - Status (e.g., successful, failed)

These are just some examples of tables and their columns that could be used in a database for a bus reservation system. The actual design may vary based on specific requirements and business logic.
Sure, here's the full code for creating the migrations for each of the tables you described:

1. **Bus Table Migration**:
```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBusTable extends Migration
{
    public function up()
    {
        Schema::create('buses', function (Blueprint $table) {
            $table->id();
            $table->string('bus_number');
            $table->integer('capacity');
            $table->string('type');
            $table->string('make_model');
            $table->enum('availability', ['active', 'inactive']);
            $table->string('current_location')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('buses');
    }
}
```

2. **Route Table Migration**:
```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRouteTable extends Migration
{
    public function up()
    {
        Schema::create('routes', function (Blueprint $table) {
            $table->id();
            $table->string('source_city');
            $table->string('destination_city');
            $table->decimal('distance', 8, 2);
            $table->string('duration');
            $table->decimal('fare', 8, 2);
            $table->time('departure_time');
            $table->time('arrival_time');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('routes');
    }
}
```

3. **Seat Table Migration**:
```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeatTable extends Migration
{
    public function up()
    {
        Schema::create('seats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bus_id')->constrained()->onDelete('cascade');
            $table->string('seat_number');
            $table->enum('availability', ['available', 'booked']);
            $table->decimal('price', 8, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('seats');
    }
}
```

4. **Passenger Table Migration**:
```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePassengerTable extends Migration
{
    public function up()
    {
        Schema::create('passengers', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->enum('gender', ['male', 'female', 'other']);
            $table->integer('age');
            $table->string('contact_number');
            $table->string('email')->unique();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('passengers');
    }
}
```

5. **Reservation Table Migration**:
```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationTable extends Migration
{
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('passenger_id')->constrained()->onDelete('cascade');
            $table->foreignId('bus_id')->constrained()->onDelete('cascade');
            $table->foreignId('route_id')->constrained()->onDelete('cascade');
            $table->foreignId('seat_id')->constrained()->onDelete('cascade');
            $table->date('booking_date');
            $table->date('journey_date');
            $table->enum('status', ['booked', 'canceled']);
            $table->enum('payment_status', ['pending', 'paid']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reservations');
    }
}
```

6. **Payment Table Migration**:
```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentTable extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 8, 2);
            $table->string('payment_method');
            $table->string('transaction_id')->nullable();
            $table->dateTime('payment_date');
            $table->enum('status', ['successful', 'failed']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
```

Make sure to run `php artisan migrate` after creating these migrations to apply them to your database.

Sure, let's define the relationships between the tables in Laravel's Eloquent ORM. Here's how you can define the relationships:

1. **Bus Model** (app/Models/Bus.php):
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{
    protected $fillable = ['bus_number', 'capacity', 'type', 'make_model', 'availability', 'current_location'];

    public function seats()
    {
        return $this->hasMany(Seat::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
```

2. **Route Model** (app/Models/Route.php):
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    protected $fillable = ['source_city', 'destination_city', 'distance', 'duration', 'fare', 'departure_time', 'arrival_time'];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
```

3. **Seat Model** (app/Models/Seat.php):
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    protected $fillable = ['bus_id', 'seat_number', 'availability', 'price'];

    public function bus()
    {
        return $this->belongsTo(Bus::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
```

4. **Passenger Model** (app/Models/Passenger.php):
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Passenger extends Model
{
    protected $fillable = ['first_name', 'last_name', 'gender', 'age', 'contact_number', 'email'];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
```

5. **Reservation Model** (app/Models/Reservation.php):
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = ['passenger_id', 'bus_id', 'route_id', 'seat_id', 'booking_date', 'journey_date', 'status', 'payment_status'];

    public function passenger()
    {
        return $this->belongsTo(Passenger::class);
    }

    public function bus()
    {
        return $this->belongsTo(Bus::class);
    }

    public function route()
    {
        return $this->belongsTo(Route::class);
    }

    public function seat()
    {
        return $this->belongsTo(Seat::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
```

6. **Payment Model** (app/Models/Payment.php):
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = ['reservation_id', 'amount', 'payment_method', 'transaction_id', 'payment_date', 'status'];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
}
```

With these relationships defined, you can now easily access related data through Eloquent's powerful ORM in your Laravel application. Remember to adjust the namespace and file paths according to your project structure if necessary.

Certainly! Here's how you can implement the logic in the controllers for managing the CRUD operations and relationships:

1. **BusController**:
```php
namespace App\Http\Controllers;

use App\Models\Bus;
use Illuminate\Http\Request;

class BusController extends Controller
{
    public function index()
    {
        $buses = Bus::all();
        return view('buses.index', compact('buses'));
    }

    public function show($id)
    {
        $bus = Bus::findOrFail($id);
        return view('buses.show', compact('bus'));
    }

    // Other CRUD operations like create, store, edit, update, and delete can be added here
}
```

2. **RouteController**:
```php
namespace App\Http\Controllers;

use App\Models\Route;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function index()
    {
        $routes = Route::all();
        return view('routes.index', compact('routes'));
    }

    public function show($id)
    {
        $route = Route::findOrFail($id);
        return view('routes.show', compact('route'));
    }

    // Other CRUD operations like create, store, edit, update, and delete can be added here
}
```

3. **SeatController**:
```php
namespace App\Http\Controllers;

use App\Models\Seat;
use Illuminate\Http\Request;

class SeatController extends Controller
{
    public function index()
    {
        $seats = Seat::all();
        return view('seats.index', compact('seats'));
    }

    public function show($id)
    {
        $seat = Seat::findOrFail($id);
        return view('seats.show', compact('seat'));
    }

    // Other CRUD operations like create, store, edit, update, and delete can be added here
}
```

4. **PassengerController**:
```php
namespace App\Http\Controllers;

use App\Models\Passenger;
use Illuminate\Http\Request;

class PassengerController extends Controller
{
    public function index()
    {
        $passengers = Passenger::all();
        return view('passengers.index', compact('passengers'));
    }

    public function show($id)
    {
        $passenger = Passenger::findOrFail($id);
        return view('passengers.show', compact('passenger'));
    }

    // Other CRUD operations like create, store, edit, update, and delete can be added here
}
```

5. **ReservationController**:
```php
namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::all();
        return view('reservations.index', compact('reservations'));
    }

    public function show($id)
    {
        $reservation = Reservation::findOrFail($id);
        return view('reservations.show', compact('reservation'));
    }

    // Other CRUD operations like create, store, edit, update, and delete can be added here
}
```

6. **PaymentController**:
```php
namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::all();
        return view('payments.index', compact('payments'));
    }

    public function show($id)
    {
        $payment = Payment::findOrFail($id);
        return view('payments.show', compact('payment'));
    }

    // Other CRUD operations like create, store, edit, update, and delete can be added here
}
```

Remember to define the necessary routes in the `routes/web.php` file to map these controller methods to specific URL endpoints. Also, make sure to handle any additional logic required for validation, authorization, and error handling within the controller methods.


If you want to determine whether a seat is booked or not, you need to have a way to track the status of each seat in your database. In your `Seat` model, you can have an `availability` column which can have values like 'available' or 'booked'. Here's how you can implement it:

1. **Database Migration**:

Modify your `seats` table migration to include an `availability` column:

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeatTable extends Migration
{
    public function up()
    {
        Schema::create('seats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bus_id')->constrained()->onDelete('cascade');
            $table->string('seat_number');
            $table->enum('availability', ['available', 'booked'])->default('available');
            $table->decimal('price', 8, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('seats');
    }
}
```

2. **Seat Model**:

Ensure your `Seat` model has the `availability` field in its `$fillable` array:

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    protected $fillable = ['bus_id', 'seat_number', 'availability', 'price'];

    // Other model methods
}
```

3. **Check Seat Availability**:

In your controller or wherever you need to check if a seat is booked, you can query the `availability` column for a specific seat:

```php
use App\Models\Seat;

$seat = Seat::find($seatId);

if ($seat && $seat->availability == 'available') {
    // Seat is available
} else {
    // Seat is booked
}
```

By updating the `availability` column in the `seats` table whenever a seat is booked or becomes available, you can accurately determine the status of each seat in your system.


If you always want to set seats for a bus with predefined seat numbers, you can create a method to automatically generate and assign seat numbers to the bus when it's created. Here's a step-by-step guide on how to implement this:

1. **Database Schema**:
   - Ensure your `seats` table has a foreign key `bus_id` to associate seats with a specific bus.

2. **Model Setup**:
   - Define the relationship between the `Bus` model and the `Seat` model.
   - Create a method in the `Bus` model to generate and assign seat numbers when a bus is created.

3. **Migration and Model Setup**:
   - Make sure your `seats` table migration includes a `bus_id` foreign key column to associate seats with a specific bus.

4. **Define Relationships**:
   - In your `Bus` model, define a relationship with the `Seat` model using the `hasMany` method.

5. **Generate and Assign Seat Numbers**:
   - Implement a method in the `Bus` model to automatically generate and assign seat numbers to the bus when it's created.

Here's how you can implement these steps:

1. **Database Migration**:
   - Make sure your `seats` table migration includes a `bus_id` foreign key column.

2. **Define Relationships**:
   - In your `Bus` model, define a relationship with the `Seat` model using the `hasMany` method:

```php
// app/Models/Bus.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{
    protected $fillable = ['bus_number', 'capacity'];

    public function seats()
    {
        return $this->hasMany(Seat::class);
    }

    public function addSeats()
    {
        $seats = [];

        for ($i = 1; $i <= $this->capacity; $i++) {
            $seats[] = new Seat(['seat_number' => $i]);
        }

        $this->seats()->saveMany($seats);
    }
}
```

3. **Usage**:
   - Now, whenever you create a new bus, you can call the `addSeats` method to automatically generate and assign seat numbers to the bus:

```php
$bus = Bus::create([
    'bus_number' => 'ABC123',
    'capacity' => 50,
]);

$bus->addSeats();
```

This code will create a new bus with the specified capacity and automatically generate seat numbers from 1 to the capacity. Each seat will be associated with the bus through the `bus_id` foreign key in the `seats` table.
