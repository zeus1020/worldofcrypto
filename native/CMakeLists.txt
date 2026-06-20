cmake_minimum_required(VERSION 3.16)
project(woc_native LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

add_compile_options(-Wall -Wextra -O2)

include_directories(${CMAKE_CURRENT_SOURCE_DIR}/include)

add_executable(woc_sim
    src/main.cpp
    src/physics.cpp
    src/pathfinding.cpp
    src/combat.cpp
    src/network.cpp
)

# Build the simulation core as a static library too, for embedding.
add_library(woc_core STATIC
    src/physics.cpp
    src/pathfinding.cpp
    src/combat.cpp
    src/network.cpp
)
