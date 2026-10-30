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
// To add a part that isn't on the 3D model (spark plugs, belts, etc.),
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
    { id: "headlights",    system: "body", name: "Headlights",           original: "Factory aero composite headlights",         status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "front-bumper",  system: "body", name: "Front Bumper",         original: "Factory chrome front bumper",               status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "front-fenders", system: "body", name: "Front Fenders",        original: "Factory steel fenders",                     status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "cab",           system: "body", name: "Cab & Roof",           original: "Factory SuperCab body",                     status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "doors",         system: "body", name: "Doors",                original: "Factory doors",                             status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "windshield",    system: "body", name: "Windshield",           original: "Factory laminated windshield",              status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "rear-window",   system: "body", name: "Rear Window",          original: "Factory rear glass",                        status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "mirrors",       system: "body", name: "Side Mirrors",         original: "Factory side mirrors",                      status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "bed",           system: "body", name: "Bed (8 ft)",           original: "Factory 8 ft Styleside bed",                status: "original", replacedWith: "", date: "", notes: "", photos: [] },
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
    { id: "exhaust-manifolds",  system: "engine", name: "Exhaust Manifolds",                original: "Factory cast-iron exhaust manifolds",                        status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "oil-pan",            system: "engine", name: "Oil Pan",                          original: "Factory oil pan",                                            status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "water-pump",         system: "engine", name: "Water Pump & Timing Cover",        original: "Factory water pump and timing cover",                        status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "radiator",           system: "engine", name: "Radiator & Hoses",                 original: "Factory radiator and coolant hoses",                         status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "cooling-fan",        system: "engine", name: "Cooling Fan & Clutch",             original: "Factory mechanical fan and fan clutch",                      status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "air-intake",         system: "engine", name: "Air Cleaner & Intake Tube",        original: "Factory air box and intake tube",                            status: "original", replacedWith: "", date: "", notes: "", photos: [] },

    // ---- Electrical
    { id: "battery",     system: "electrical", name: "Battery",                original: "Factory 12V battery",                  status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "alternator",  system: "electrical", name: "Alternator",             original: "Factory alternator",                   status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "starter",     system: "electrical", name: "Starter",                original: "Factory starter motor",                status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "distributor", system: "electrical", name: "Distributor & Ignition", original: "Factory distributor, cap and rotor",   status: "original", replacedWith: "", date: "", notes: "", photos: [] },

    // ---- Transmission & Drivetrain
    { id: "transmission",     system: "drivetrain", name: "Automatic Transmission",       original: "Factory 4-speed automatic with overdrive",       status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "transfer-case",    system: "drivetrain", name: "Transfer Case",                original: "Factory 4x4 transfer case",                      status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "front-driveshaft", system: "drivetrain", name: "Front Driveshaft",             original: "Factory front driveshaft",                       status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "driveshaft",       system: "drivetrain", name: "Rear Driveshaft",              original: "Factory two-piece driveshaft with carrier bearing", status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "front-axle",       system: "drivetrain", name: "Front Axle & Differential (Dana 44 TTB)", original: "Factory Dana 44 Twin Traction Beam front axle", status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "locking-hubs",     system: "drivetrain", name: "Front Locking Hubs",           original: "Factory front locking hubs",                     status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "rear-axle",        system: "drivetrain", name: "Rear Axle & Differential",     original: "Ford 8.8\" rear axle",                           status: "original", replacedWith: "", date: "", notes: "", photos: [] },

    // ---- Suspension & Steering
    { id: "front-springs",       system: "suspension", name: "Front Coil Springs",        original: "Factory front coil springs",          status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "front-shocks",        system: "suspension", name: "Front Shocks",              original: "Factory front shock absorbers",       status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "radius-arms",         system: "suspension", name: "Radius Arms & Bushings",    original: "Factory radius arms and bushings",    status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "steering-gearbox",    system: "suspension", name: "Steering Gearbox",          original: "Factory power steering gearbox",      status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "steering-linkage",    system: "suspension", name: "Tie Rods & Steering Linkage", original: "Factory tie rods, drag link and intermediate shaft", status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "power-steering-pump", system: "suspension", name: "Power Steering Pump",       original: "Factory power steering pump",         status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "rear-leaf-springs",   system: "suspension", name: "Rear Leaf Springs",         original: "Factory multi-leaf rear springs",     status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "rear-shocks",         system: "suspension", name: "Rear Shocks",               original: "Factory rear shock absorbers",        status: "original", replacedWith: "", date: "", notes: "", photos: [] },

    // ---- Brakes
    { id: "front-brakes", system: "brakes", name: "Front Brakes", original: "Factory disc rotors and calipers",          status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "rear-brakes",  system: "brakes", name: "Rear Brakes",  original: "Factory drum brakes with rear-wheel ABS",   status: "original", replacedWith: "", date: "", notes: "", photos: [] },

    // ---- Wheels & Tires
    { id: "tires",  system: "wheels", name: "Tires",  original: "Factory P235/75R15 tires", status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "wheels", system: "wheels", name: "Wheels", original: "Factory 15\" wheels",       status: "original", replacedWith: "", date: "", notes: "", photos: [] },

    // ---- Frame
    { id: "frame", system: "frame", name: "Frame & Crossmembers", original: "Factory ladder frame", status: "original", replacedWith: "", date: "", notes: "", photos: [] },

    // ---- Fuel & Exhaust
    { id: "fuel-tanks",          system: "fuel", name: "Fuel Tanks",          original: "Factory dual tanks (midship and rear)", status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "exhaust-pipes",       system: "fuel", name: "Exhaust Pipes",       original: "Factory Y-pipe and tailpipe",            status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "catalytic-converter", system: "fuel", name: "Catalytic Converter", original: "Factory catalytic converter",            status: "original", replacedWith: "", date: "", notes: "", photos: [] },
    { id: "muffler",             system: "fuel", name: "Muffler",             original: "Factory muffler",                        status: "original", replacedWith: "", date: "", notes: "", photos: [] }
  ]
};
