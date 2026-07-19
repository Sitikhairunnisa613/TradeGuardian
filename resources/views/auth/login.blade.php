<x-guest-layout>

<div class="login-page">

    <div class="login-left">

        <div class="brand">

            <div class="planet">
                🌍
            </div>

            <h1>TradeGuardian</h1>

            <p class="subtitle">
                Global Trade Intelligence Platform
            </p>

        </div>

        <h2>
            Secure International
            <br>
            Trade Monitoring
        </h2>

        <p>

            Monitor global trade, analyze economic trends,
            monitor shipping routes, and receive AI-powered
            recommendations in one dashboard.

        </p>

    </div>

    <div class="login-right">

        <div class="login-card">

            <h3>Welcome Back</h3>

            <p class="text-muted mb-4">
                Sign in to continue
            </p>

            <form method="POST" action="{{ route('login') }}">

                @csrf

                <div class="mb-3">

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        class="form-control"
                        value="{{ old('email') }}"
                        required
                    >

                </div>

                <div class="mb-4">

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        class="form-control"
                        required
                    >

                </div>

                <button class="btn-login">

                    Login

                </button>

            </form>

        </div>

    </div>

</div>

</x-guest-layout>