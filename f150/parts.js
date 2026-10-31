// 1992 Ford F-150 build log.
//
// This is the only file you need to edit to record progress on the truck.
// Each part shows up on the 3D model (if it has one) and in the Build Log.
//
//   status        "original"     still the factory part
//                 "replaced"     swapped out (fill in replacedWith)
//                 "in-progress"  currently being worked on
//                 "planned"      on the to-do list
//   replacedWith  what you put in, e.g. "Bilstein 5100 shocks"
//   date          when you did it, e.g. "2026-10-29" or "Oct 2026"
//   notes         anything else worth sharing
//   photos        image paths, e.g. ["f150/photos/shocks-1.jpg"]
//                 or with captions: [{ src: "f150/photos/shocks-1.jpg", caption: "Old vs new" }]
//
// To add a part that isn't on the 3D model (belts, fluids, etc.),
// copy any entry, give it a new id, and it will appear in the Build Log.

window.F150_BUILD = {
  systems: [
    { id: "body",       name: "Body & Exterior",          icon: "bx bx-car" },
    { id: "interior",   name: "Interior",                 icon: "bx bx-chair" },
    { id: "engine",     name: "Engine (302 5.0L V8)",     icon: "bx bx-tachometer" },
    { id: "electrical", name: "Electrical",               icon: "bx bx-car-battery" },
    { id: "drivetrain", name: "Transmission & Drivetrain", icon: "bx bx-cog" },
    { id: "suspension", name: "Suspension & Steering",    icon: "bx bx-wrench" },
    { id: "brakes",     name: "Brakes",                   icon: "bx bx-disc" },
    { id: "wheels",     name: "Wheels & Tires",           icon: "bx bx-circle" },
    { id: "frame",      name: "Frame",                    icon: "bx bx-grid-alt" },
    { id: "fuel",       name: "Fuel & Exhaust",           icon: "bx bx-gas-pump" }
  ],

  parts: [
    // ---- Body & Exterior
    { id: "hood",          system: "body", name: "Hood",                 original: "Factory steel hood",                        status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "grille",        system: "body", name: "Grille",               original: "Factory grille",                            status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "headlights",    system: "body", name: "Headlights",           original: "Factory aero composite headlights",         status: "replaced", replacedWith: "New OE Headlight Assembly", date: "2024", notes: "", photos: ["f150/photos/headlights.jpg"] },
    { id: "front-bumper",  system: "body", name: "Front Bumper",         original: "Factory chrome front bumper",               status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "front-fenders", system: "body", name: "Front Fenders",        original: "Factory steel fenders",                     status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "cab",           system: "body", name: "Cab & Roof",           original: "Factory SuperCab body",                     status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "doors",         system: "body", name: "Doors",                original: "Factory doors",                             status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "windshield",    system: "body", name: "Windshield",           original: "Factory laminated windshield",              status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "rear-window",   system: "body", name: "Rear Window",          original: "Factory rear glass",                        status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "mirrors",       system: "body", name: "Side Mirrors",         original: "Factory side mirrors",                      status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "bed",           system: "body", name: "Bed (8 ft)",           original: "Factory 8 ft Styleside bed",                status: "in progress", replacedWith: "", date: "2025", notes: "Sandblasted bottom side and repainted", photos: [] },
    { id: "tailgate",      system: "body", name: "Tailgate",             original: "Factory tailgate",                          status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "taillights",    system: "body", name: "Taillights",           original: "Factory taillight assemblies",              status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "rear-bumper",   system: "body", name: "Rear Bumper",          original: "Factory rear step bumper",                  status: "original", replacedWith: "", date: "", notes: "", photos: [] },

    // ---- Interior
    { id: "dashboard",      system: "interior", name: "Dashboard & Gauges",       original: "Factory dash and instrument cluster", status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "steering-wheel", system: "interior", name: "Steering Wheel & Column",  original: "Factory steering wheel and column",   status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "front-seat",     system: "interior", name: "Front Seat",               original: "Factory front seat",                  status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "rear-seats",     system: "interior", name: "Rear Jump Seats",          original: "Factory SuperCab rear jump seats",    status: "original", replacedWith: "", date: "", notes: "", photos: [] },

    // ---- Engine
    { id: "engine-block",       system: "engine", name: "Engine Block (302 5.0L V8)",       original: "Factory 302 cu in (5.0L) V8 with multi-port fuel injection", status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "cylinder-heads",     system: "engine", name: "Cylinder Heads & Valve Covers",    original: "Factory cast-iron heads and valve covers",                   status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "intake-manifold",    system: "engine", name: "Intake Manifold & Throttle Body",  original: "Factory EFI upper/lower intake and throttle body",           status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "exhaust-manifolds",  system: "engine", name: "Exhaust Manifolds",                original: "Factory cast-iron exhaust manifolds",                        status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/manifold.jpg"] },
    { id: "oil-pan",            system: "engine", name: "Oil Pan",                          original: "Factory oil pan",                                            status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/oil pan.jpg"] },
    { id: "oil-pan-gasket",     system: "engine", name: "Oil Pan Gasket",                   original: "Factory oil pan gasket",                                     status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/oil gasket.jpg"] },
    { id: "oil-pump",           system: "engine", name: "Oil Pump",                         original: "Factory oil pump",                                           status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/oil pan pump.jpg"] },
    { id: "oil-pickup-tube",    system: "engine", name: "Oil Pump Pickup Tube",             original: "Factory oil pump pickup tube and screen",                    status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/pickup tube.jpg"] },
    { id: "motor-mounts",       system: "engine", name: "Motor Mounts",                     original: "Factory engine mounts",                                      status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/engine mounts.jpg"] },
    { id: "water-pump",         system: "engine", name: "Water Pump & Timing Cover",        original: "Factory water pump and timing cover",                        status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/water pump.jpg"] },
    { id: "water-pump-hoses",   system: "engine", name: "Water Pump Hoses",                 original: "Factory water pump bypass and heater hoses",                 status: "replaced", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "radiator",           system: "engine", name: "Radiator",                         original: "Factory radiator",                                           status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "radiator-hoses",     system: "engine", name: "Radiator Hoses",                   original: "Factory upper and lower radiator hoses",                     status: "replaced", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "radiator-cap",       system: "engine", name: "Radiator Cap",                     original: "Factory radiator cap",                                       status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/rad cap.jpg"] },
    { id: "thermostat",         system: "engine", name: "Coolant Thermostat",               original: "Factory thermostat and housing gasket",                      status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/coolant thermostat.jpg"] },
    { id: "coolant",            system: "engine", name: "Coolant",                          original: "Factory green ethylene glycol coolant",                      status: "replaced", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "cooling-fan",        system: "engine", name: "Cooling Fan & Clutch",             original: "Factory mechanical fan and fan clutch",                      status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "air-intake",         system: "engine", name: "Air Cleaner & Intake Tube",        original: "Factory air box and intake tube",                            status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "vacuum-lines",       system: "engine", name: "Vacuum Lines",                     original: "Factory vacuum hoses and lines",                             status: "replaced", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "egr-solenoid",       system: "engine", name: "EGR Control Solenoid",             original: "Factory EGR vacuum control solenoid",                        status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/egr solenoid.png"] },

    // ---- Electrical
    { id: "battery",     system: "electrical", name: "Battery",                original: "Factory 12V battery",                  status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "alternator",  system: "electrical", name: "Alternator",             original: "Factory alternator",                   status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "starter",     system: "electrical", name: "Starter",                original: "Factory starter motor",                status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "distributor", system: "electrical", name: "Distributor & Ignition", original: "Factory distributor, cap and rotor",   status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "spark-plugs", system: "electrical", name: "Spark Plugs",            original: "Factory spark plugs (8)",              status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/spark plugs.jpg"] },

    // ---- Transmission & Drivetrain
    { id: "transmission",     system: "drivetrain", name: "Automatic Transmission",       original: "Factory 4-speed automatic with overdrive",       status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "trans-pan",        system: "drivetrain", name: "Transmission Pan",             original: "Factory transmission pan",                       status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/transmission pan.jpg"] },
    { id: "trans-filter",     system: "drivetrain", name: "Transmission Filter",          original: "Factory transmission filter",                    status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/trans filter.jpg"] },
    { id: "trans-pan-gasket", system: "drivetrain", name: "Transmission Pan Gasket",      original: "Factory transmission pan gasket",                status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/trans gasket.jpg"] },
    { id: "trans-pan-bolts",  system: "drivetrain", name: "Transmission Pan Bolts",       original: "Factory transmission pan bolts",                 status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/trans bolts.jpg"] },
    { id: "trans-mount",      system: "drivetrain", name: "Transmission Mount",           original: "Factory transmission mount",                     status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/trans mount.jpg"] },
    { id: "transfer-case",   system: "drivetrain", name: "Transfer Case",                original: "Factory 4x4 transfer case",                      status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "front-driveshaft", system: "drivetrain", name: "Front Driveshaft",             original: "Factory front driveshaft",                       status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "driveshaft",       system: "drivetrain", name: "Rear Driveshaft",              original: "Factory two-piece driveshaft with carrier bearing", status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "driveshaft-ujoints", system: "drivetrain", name: "Driveshaft U-Joints",        original: "Factory driveshaft universal joints",            status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/driveshaft ujoints.jpg"] },
    { id: "driveshaft-yoke",  system: "drivetrain", name: "Driveshaft Yoke",              original: "Factory driveshaft slip yoke",                   status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/driveshaft yoke.png"] },
    { id: "carrier-bearing",  system: "drivetrain", name: "Carrier Bearing",              original: "Factory driveshaft center support bearing",      status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/carrier bearing.jpg"] },
    { id: "front-axle",       system: "drivetrain", name: "Front Axle & Differential (Dana 44 TTB)", original: "Factory Dana 44 Twin Traction Beam front axle", status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "axle-ujoints",     system: "drivetrain", name: "Front Axle U-Joints",          original: "Factory front axle shaft universal joints",      status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/front axle u joints.jpg"] },
    { id: "locking-hubs",     system: "drivetrain", name: "Front Locking Hubs",           original: "Factory front locking hubs",                     status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "rear-axle",        system: "drivetrain", name: "Rear Axle & Differential",     original: "Ford 8.8\" rear axle",                           status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "rear-diff-cover",  system: "drivetrain", name: "Rear Differential Cover",      original: "Factory stamped steel differential cover",       status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/rear diff cover.jpg"] },

    // ---- Suspension & Steering
    { id: "front-springs",       system: "suspension", name: "Front Coil Springs",        original: "Factory front coil springs",          status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "front-shocks",        system: "suspension", name: "Front Shocks",              original: "Factory front shock absorbers",       status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/front suspension.jpg"] },
    { id: "radius-arms",         system: "suspension", name: "Radius Arms & Bushings",    original: "Factory radius arms and bushings",    status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "steering-gearbox",    system: "suspension", name: "Power Steering Gearbox",        original: "Factory power steering gearbox",      status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/power steering gear box.jpg"] },
    { id: "pitman-arm",          system: "suspension", name: "Pitman Arm",                original: "Factory pitman arm",                  status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/pitman arm.jpg"] },
    { id: "steering-linkage",   system: "suspension", name: "Tie Rods & Steering Linkage", original: "Factory tie rods, drag link and intermediate shaft", status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/steering linkage.jpg"] },
    { id: "steering-stabilizer", system: "suspension", name: "Steering Stabilizer",       original: "Factory steering damper",             status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/steering stabilizer.png"] },
    { id: "power-steering-pump", system: "suspension", name: "Power Steering Pump",       original: "Factory power steering pump",         status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/power steering pump.jpg"] },
    { id: "power-steering-lines", system: "suspension", name: "Power Steering Fluid Lines", original: "Factory pressure and return hoses",  status: "replaced", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "rear-leaf-springs",   system: "suspension", name: "Rear Leaf Springs",         original: "Factory multi-leaf rear springs",     status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "rear-shocks",         system: "suspension", name: "Rear Shocks",               original: "Factory rear shock absorbers",        status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/rear suspension.jpg"] },
    { id: "front-sway-bar",      system: "suspension", name: "Front Sway Bar",            original: "Factory front stabilizer bar and links", status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/front sway bar.jpg"] },
    { id: "rear-sway-bar",       system: "suspension", name: "Rear Sway Bar",             original: "Factory rear stabilizer bar",            status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/rear sway bar.png"] },
    { id: "rear-sway-bar-links", system: "suspension", name: "Rear Sway Bar Links",       original: "Factory rear stabilizer end links",   status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/rear sway bar links.jpg"] },

    // ---- Brakes
    { id: "front-brakes", system: "brakes", name: "Front Brakes", original: "Factory disc rotors and calipers",          status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "rear-brakes",  system: "brakes", name: "Rear Brakes",  original: "Factory drum brakes with rear-wheel ABS",   status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "brake-booster",   system: "brakes", name: "Power Brake Booster",  original: "Factory vacuum brake booster",   status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/power brake booster.jpg"] },
    { id: "master-cylinder", system: "brakes", name: "Master Cylinder",      original: "Factory master cylinder",        status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/master cylinder.jpg"] },
    { id: "bleeder-screws",  system: "brakes", name: "Brake Bleeder Screws", original: "Factory caliper and wheel cylinder bleeder screws", status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/brake screws.jpg"] },

    // ---- Wheels & Tires
    { id: "tires",  system: "wheels", name: "Tires",  original: "Factory P235/75R15 tires", status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "wheels", system: "wheels", name: "Wheels", original: "Factory 15\" wheels",       status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/wheels.jpg"] },

    // ---- Frame
    { id: "frame", system: "frame", name: "Frame & Crossmembers", original: "Factory ladder frame", status: "original", replacedWith: "", date: "", notes: "", photos: [] },

    // ---- Fuel & Exhaust
    { id: "fuel-tanks",          system: "fuel", name: "Fuel Tanks",          original: "Factory dual tanks (midship and rear)", status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/fuel tank1.jpg", "f150/photos/fuel tank2.jpg"] },
    { id: "fuel-tank-straps",    system: "fuel", name: "Fuel Tank Straps",    original: "Factory fuel tank straps",               status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/fuel straps.jpg"] },
    { id: "fuel-pumps",          system: "fuel", name: "Fuel Pumps",          original: "Factory electric fuel pumps",            status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/fuel pumps.jpg"] },
    { id: "fuel-filter",         system: "fuel", name: "Fuel Filter",         original: "Factory inline fuel filter",             status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/fuel filter.jpg"] },
    { id: "fuel-filler-necks",   system: "fuel", name: "Fuel Filler Necks",   original: "Factory filler necks (both tanks)",      status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/fuel filler necks.jpg"] },
    { id: "gas-caps",            system: "fuel", name: "Gas Caps",            original: "Factory gas caps (both tanks)",          status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/gas caps.jpg"] },
    { id: "o2-sensors",          system: "fuel", name: "O2 Sensors",          original: "Factory oxygen sensors",                 status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/O2 Sensor.jpg"] },
    { id: "exhaust-pipes",       system: "fuel", name: "Exhaust Pipes",       original: "Factory Y-pipe and tailpipe",            status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/exhaust.jpg"] },
    { id: "catalytic-converter", system: "fuel", name: "Catalytic Converter", original: "Factory catalytic converter",            status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/catalytic converter.jpg"] },
    { id: "muffler",             system: "fuel", name: "Muffler",             original: "Factory muffler",                        status: "replaced", replacedWith: "", date: "", notes: "", photos: ["f150/photos/exhaust.jpg"] }
  ]
};
