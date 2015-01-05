module.exports = {

	// mongoDB access
	database: {
		host: 'localhost',
		port: 27017,
		db: 'real2time_test',
		options: {
			auto_reconnect: true
		}
	},

	// Bind port/IP
	server: {
		port: 8080,
		address: "127.0.0.1"
	},

	sessions: {
		key: 'some-key',
		secret: 'some-We1rD sEEEEEcret!'
	},

	// Features
	r2t_storm: {
		port: 44420,
		host: "localhost"
	},

	storm_server: {
		ui: {
			port: 8080,
			host: "localhost"
		}
	},

    proxy: {
        storm_server: {
            ui: {
                port: 8081
            }
        },
    },

	users: {
		creation: {
			// Is the creation of new users public ?
			"public": false
		}
	}

};
