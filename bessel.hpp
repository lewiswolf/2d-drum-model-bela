#include <cmath>

double bessel(int n, double x) {
	/*
	Calculates the bessel function of the first kind J_n(x)
	Adapted from void bess() http://www.falstad.com/circosc-java/CircOsc.java
	Inputs:
		n - bessel order
		x - x coordinate
	Outputs:
		y - y value for J_n(x)
	*/

	// calculate J_k(x) for all k < n
	int maxmx = max(n, (int)x);
	int n_top = 2 * ((int)((maxmx + 15) / 2 + 1));
	// vector to store recursion values
	double j[n_top + 2];
	j[n_top + 1] = 0.0;
	j[n_top] = 1.0;
	double epsilon = 1e-16;
	// downwards recursion
	for(int i = n_top - 2; i >= 0; i--) {
		j[i + 1] = 2 * (i + 1) / (x + epsilon) * j[i + 2] - j[i + 3];
	}
	// sum together predicted values
	double norm = j[1];
	for(unsigned int i = 2; i <= n_top; i += 2 ) {
		norm += 2 * j[i + 1];
	}
	// return y
	return j[n + 1] / norm;
}

double besselZero(int n, int m) {
	/*
	Calculates the mth zero crossing of bessel functions of the first kind
	Adapted from double zeroj() http://www.falstad.com/circosc-java/CircOsc.java
	Input:
		n - bessel order
		m - mth zero
	Output:
		z_nm - mth zero crossing of J_n()
	*/

	// Asymtotic expansions found in Theory of Bessel Functions p.506
	double beta = (m + 0.5 * n - 0.25) * M_PI;
	double beta8 = beta * 8;
	double mu = 4 * n * n;
	double z_nm = beta - (mu - 1) / beta8;
	z_nm -= 4 * (mu - 1) * (7 * mu - 31)/(3 * pow(beta8, 3));
	z_nm -= 32 * (mu - 1) * (83 * pow(mu, 2) - 982 * mu + 3779) / (15 * pow(beta8, 5));
	z_nm -= 64 * (mu - 1) * (6949 * pow(mu, 3) - 153855 * pow(mu, 2) + 1585743 * mu - 6277237) / (105 * pow(beta8, 7));

	// Newton's method for approximating roots
	for(unsigned int i = 1; i <= 5; i++) {
		
		/*
		Much of the code below is shared with the bessel() function declared above,
		as I could not figure out how to pass arrays between functions.
		*/
		// calculate J_k(x) for all k < n
		int maxmx = max(n, (int)z_nm);
		int n_top = 2 * ((int)((maxmx + 15) / 2 + 1));
		// prepare vector to store recursion values
		double j[n_top + 2];
		j[n_top + 1] = 0.0;
		j[n_top] = 1.0;
		double epsilon = 1e-16;
		// downwards recursion
		for(int i = n_top - 2; i >= 0; i--) {
			j[i + 1] = 2 * (i + 1) / (z_nm + epsilon) * j[i + 2] - j[i + 3];
		}
		// normalise
		double norm = j[1];
		for(unsigned int i = 2; i <= n_top; i += 2 ) {
			norm += 2 * j[i + 1];
		}
		for(unsigned int i = 0; i <= n_top; i++) {
			j[i + 1] = j[i + 1] / norm;
		}
		/*
		Much of the code above is shared with the bessel() function declared above,
		as I could not figure out how to pass arrays between functions.
		*/

		// use the recursion relation to evaluate derivative
		double deriv = -j[n + 2] + n / z_nm * j[n + 1];
		z_nm -= j[n + 1] / deriv;
	}

	return z_nm;
}