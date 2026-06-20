#pragma once
#include <cmath>

namespace woc {

/// Lightweight 2D vector used throughout the native engine core.
struct Vec2 {
    float x = 0.0f;
    float y = 0.0f;

    Vec2() = default;
    Vec2(float x_, float y_) : x(x_), y(y_) {}

    Vec2 operator+(const Vec2& o) const { return {x + o.x, y + o.y}; }
    Vec2 operator-(const Vec2& o) const { return {x - o.x, y - o.y}; }
    Vec2 operator*(float s) const { return {x * s, y * s}; }

    float length() const { return std::sqrt(x * x + y * y); }

    Vec2 normalized() const {
        float len = length();
        return len > 0.0f ? Vec2{x / len, y / len} : Vec2{0.0f, 0.0f};
    }

    static float distance(const Vec2& a, const Vec2& b) {
        return (a - b).length();
    }

    static float dot(const Vec2& a, const Vec2& b) {
        return a.x * b.x + a.y * b.y;
    }
};

} // namespace woc
