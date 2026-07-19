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

            Create Your
            <br>
            TradeGuardian Account

        </h2>

        <p>

            Join TradeGuardian to monitor international trade,
            analyze global markets, and receive AI-powered
            recommendations for worldwide business opportunities.

        </p>

    </div>

    <div class="login-right">

        <div class="login-card">

            <h3>Create Account</h3>

            <p class="text-muted mb-4">

                Register to start using TradeGuardian

            </p>

            <form method="POST" action="{{ route('register') }}">

                @csrf

                <div class="mb-3">

                    <label>Full Name</label>

                    <input
                        type="text"
                        name="name"
                        value="{{ old('name') }}"
                        required
                    >

                    @error('name')
                        <small class="text-danger">{{ $message }}</small>
                    @enderror

                </div>

                <div class="mb-3">

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        value="{{ old('email') }}"
                        required
                    >

                    @error('email')
                        <small class="text-danger">{{ $message }}</small>
                    @enderror

                </div>

                <div class="mb-3">

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        required
                    >

                    @error('password')
                        <small class="text-danger">{{ $message }}</small>
                    @enderror

                </div>

                <div class="mb-4">

                    <label>Confirm Password</label>

                    <input
                        type="password"
                        name="password_confirmation"
                        required
                    >

                </div>

                <button
                    type="submit"
                    class="btn-login">

                    Register

                </button>

            </form>

            <div class="text-center mt-4">

                Already have an account?

                <a href="{{ route('login') }}">

                    Login

                </a>

            </div>

        </div>

    </div>

</div>

</x-guest-layout>