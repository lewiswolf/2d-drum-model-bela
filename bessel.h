#include <cmath>

double besselZero(int n, int m) {
	/*
		Calculates the mth zero crossing b_nm such that
		J_n(B_mn) ~ 0
		Input:
			n - bessel order
			m - mth zero
		Output:
			z_mn - mth zero crossing of J_n()
	*/

	// Asymtotic expansions found in Theory of Bessel Functions p.506
	double beta = (m + 0.5 * n - 0.25) * M_PI;
	double beta8 = beta * 8;
	double mu = 4 * n * n;
	double z_mn = beta - (mu - 1) / beta8;
	z_mn -= 4 * (mu - 1) * (7 * mu - 31)/(3 * pow(beta8, 3));
	z_mn -= 32 * (mu - 1) * (83 * pow(mu, 2) - 982 * mu + 3779) / (15 * pow(beta8, 5));
	z_mn -= 64 * (mu - 1) * (6949 * pow(mu, 3) - 153855 * pow(mu, 2) + 1585743 * mu - 6277237) / (105 * pow(beta8, 7));

	// Newton's method
	// 0 ~ x_n - (f(x_n) / f'(x_n))
	for (unsigned int i = 0; i < 5; i++){
		double x = z;

	}

	return z_mn;
}

double bessel(int n, double x) {
	/*
		Calculates the bessel function J_n(x)
		Inputs:
			n - bessel order
			x - x coordinate
		Outputs:
			y - y value for J_n(x)
	*/

	double y;

	return y;
}

double besselPrime(int n, double x) {
	/*
		Calculates the derivative of the bessel function J'_n(x)
		Inputs:
			n - bessel order
			x - x coordinate
		Outputs:
			y - y value for J'_n(x)
	*/

	double y;

	return y;
}
    



	//* Use Newton's method to locate the root
	// double jj[] = new double[n+3];
	// int i;  double deriv;
	// for( i=1; i<=5; i++ ) {
	// 	bess( n+1, z, jj );  // Remember j(1) is J_0(z)     
	// 	// Use the recursion relation to evaluate derivative
	// 	deriv = -jj[n+2] + n/z * jj[n+1];
	// 	z -= jj[n+1]/deriv;  // Newton's root finding  
	// }